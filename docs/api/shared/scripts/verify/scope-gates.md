# `shared\scripts\verify\scope-gates.mjs`

Scoped quality-gate runner for the module workspace. Git

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\verify\scope-gates.mjs`             |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SCOPES`

Scope registry: module dirs, the per-module tsconfig and jest config,
and policy flags.
dirs — source roots eslint/stylelint scan.
tsconfig — scoped compilation target.
jest — the module's own Jest config (its tests live inside it).
governance — also run the cross-cutting scan suite in shared/tests.
a11y — include axe-scan + contrast-aaa in that governance run.
lighthouse — the scope is eligible for Lighthouse performance checks.

### `SCOPE_ROOTS`

Scope → module repository root. Every module is a git submodule whose
own hooks ran its gates; `root` is where the stored gate result lives
(`<root>/reports/gate-result.json`). 'app' is the shared module.

### `LINK_SCOPES`

Submodule path (gitlink) → scope, derived from SCOPE_ROOTS.

### `PATH_SCOPE_RULES`

Ordered most-specific first — first match wins.

### `GLOBAL_FILES`

Files whose change ripples to every module (toolchain, lockfile, config).

### `GOVERNANCE_DIR`

Governance scans that are NOT accessibility checks — style, JSDoc, and
portability governance run for every gated scope including cms. The a11y
pair (axe-scan, contrast-aaa) is appended only when the scope's `a11y`
flag allows it.

### `scopeForPath`

Maps one changed path to its scope (or 'shared' for infra/toolchain).

### `expand`

Expands a scope set: 'shared'/'all' resolve to concrete scopes.

### `changedFiles`

Lists files changed in a diff range (or the index for --staged). The
64 MiB maxBuffer absorbs mega-diffs — the default 1 MiB silently
truncated a ~21k-file push and produced an empty list. A diff failure
is fatal, not skippable: returning [] would push with zero gates.

### `runAsync`

Async counterpart for parallel gate steps — spawns the check with piped
stdio so concurrently-running children can't interleave their report
blocks; the captured output is replayed under the step's banner on exit.
`extraEnv` carries per-step overrides (e.g. a split JEST_MAX_WORKERS
budget when two jest pools run side by side).

- `@param` {string} label banner prefix
- `@param` {string} cmd executable
- `@param` {string[]} args argv
- `@param` {object} [extraEnv] env overrides merged over process.env
- `@returns` {Promise<void>} resolves on exit 0, rejects otherwise

### `jestWorkerShare`

Total jest-worker budget for a gate run — mirrors jest.preset's
RAM-derived cap (2GiB/worker, cores−1) so two concurrent jest pools
(module suite + governance) split the same ceiling instead of each
claiming it whole.

- `@param` {number} share fraction of the budget this pool gets
- `@returns` {string} JEST_MAX_WORKERS value

### `runGovernance`

Runs the cross-cutting governance suite (shared/tests/governance) under
the shared module's Jest config. Scopes flagged `a11y: false` (cms)
exclude the axe/contrast pair per the workspace contract.

### `resultFile`

Stored gate-result path for a module — `reports/` is gitignored, so the
stamp is a local artifact: the superproject validates it locally before
pushing, and CI (fresh checkout, no reports) simply falls back to
running the gates.

### `gitlinkSha`

The commit a parent's HEAD gitlink points at for a submodule path.

### `moduleHead`

The module worktree's own HEAD — what its hooks stamped.

### `stamp`

Stamps a passing gate run: `<module>/reports/gate-result.json` records
the module HEAD and the checks that ran, so later parent-level pushes
of the same commit validate instantly instead of re-running.

### `runScope`

Runs the gate set for one scope and stamps the stored result. All checks
are independent read-only runs, so they execute CONCURRENTLY — the lint
trio (tsc/eslint/stylelint) plus the jest pair. When a scope runs both
jest pools, each gets half the RAM-derived worker budget via
JEST_MAX_WORKERS so the aggregate stays under the same ceiling a single
full-size pool would use. A failed check rejects; Promise.allSettled
lets the rest finish their buffered output before the error surfaces.

### `runLink`

/*.scss`),
'--max-warnings=0',
])
)
}

const runJest = exists(def.jest)
const runGov = def.governance

// Two concurrent jest pools split the worker budget 50/50; a lone pool
// keeps the full share.
const jestShare = runJest && runGov ? 0.5 : 1

if (runJest) {
checks.push('jest')
tasks.push(
runAsync(`${scope} jest`, 'node', [...JEST, '--config', def.jest], {
JEST_MAX_WORKERS: jestWorkerShare(jestShare),
})
)
}

if (runGov) {
checks.push('governance')
tasks.push(runGovernance(scope, def.a11y, { JEST_MAX_WORKERS: jestWorkerShare(jestShare) }))
}

const results = await Promise.allSettled(tasks)
const failed = results.find((r) => r.status === 'rejected')

if (failed) throw failed.reason

stamp(scope, checks)
}

/**
Validates a gitlink bump via the module's stored gate result. The
module's own hooks stamped `reports/gate-result.json` when its commit
was gated; if that stamp matches the commit the parent is about to
record, nothing re-runs. Missing/stale stamps fall back to the scope's
full gate set (then re-stamp) — the gate stays honest either way.
