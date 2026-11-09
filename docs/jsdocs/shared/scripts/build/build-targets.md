# `shared\scripts\build\build-targets.mjs`

Multi-target build orchestrator.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\build-targets.mjs`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `run`

Spawns a build step with inherited stdio and a 30s heartbeat on stderr —
long silent steps (rolldown chunk render, minify) otherwise look frozen
in CI. Rejects on non-zero exit or spawn error.

- `@param` {string} cmd executable
- `@param` {string[]} args argv
- `@param` {object} [env] extra env merged over process.env
- `@param` {string} [label] heartbeat banner text
- `@returns` {Promise<void>} resolves on exit 0

### `BUILD_WORKERS`

Concurrent vite-build pool width. Each child peaks around 1.5–2.5GB
(rolldown graph + terser + compression plugin), so the cap is RAM-
derived: ~4GiB per build against total memory, bounded by cores.
LK_BUILD_WORKERS overrides for hosts with different budgets.

### `buildTier`

Runs `vite build` for one tier. `first` marks the owner build: it alone
wipes dist/ (emptyOutDir) and copies the public dir, so it must run
BEFORE the parallel wave starts.

- `@param` {object} t ES_TARGETS entry
- `@param` {number} i index in buildList (banner display only)
- `@param` {boolean} first whether this build owns dist/ initialization
- `@returns` {Promise<void>} resolves on child exit 0

### `tierCursor`

Bounded drain over the remaining tiers: BUILD_WORKERS workers pull from
the shared index until exhausted. Each vite child writes only its own
dist/v/<tier>/ tree (LK_EMPTY_OUTDIR=0), so concurrent children can never
touch each other's output. Iterative worker-drain — the tasks are
already materialized, no self-similar traversal here.

### `compiledCssSheet`

Lazily-cached sass compilation of the global sheet — the input file and
options are identical for every tier call, so the (~1-2s) compile runs
once per build instead of once per emitCss() call (up to 26 times).
Only the per-tier lightningcss `targets` differ downstream.

### `transformSheet`

Lightningcss transform of the compiled global sheet for one tier —
extracted so both emitCss (monolith emit) and emitCssSplits (cumulative
width-class emit) share the same minify/prefix pipeline.

- `@param` {object} t ES_TARGETS entry
- `@returns` {Promise<{code:Buffer, map:Buffer}>} transformed sheet + map

### `emitCssSplits`

Emits the tier's document stylesheet as cumulative width-class files —
`index-mobile-<hash>.css` carries base+mobile blocks, `index-tablet-*`
adds tablet blocks, and so on; `index-wide-*` is the full sheet and also
keeps the sourcemap. The loader injects exactly one of them per viewport
class, so a phone never downloads desktop/wide rules.

- `@param` {object} t ES_TARGETS entry
- `@returns` {Promise<Record<string,string>>} {cls → emitted file name}

### `emitCss`

Emits the tier's full document sheet as ONE monolithic hashed file —
the fallback path when vite already produced a css/ asset AND the
debug/sourcemap copy (`prefix 'app-'`). Splits stay the primary ship;
this exists so `index-<hash>.css` consumers keep working.

- `@param` {object} t ES_TARGETS entry
- `@param` {string} [prefix] output file-name prefix
- `@returns` {Promise<string>} emitted file name
