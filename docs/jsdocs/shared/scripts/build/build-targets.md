# `shared\scripts\build\build-targets.mjs`

Multi-target build orchestrator.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\build-targets.mjs`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

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
