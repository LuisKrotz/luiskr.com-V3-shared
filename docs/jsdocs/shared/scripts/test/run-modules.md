# `shared\scripts\test\run-modules.mjs`

Runs the Jest suite of every module workspace — shared,

| | |
|---|---|
| **Source** | `src/shared\scripts\test\run-modules.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `perWorkerGb`

Total jest-worker budget this machine affords — identical formula to
shared/tests/jest.preset.mjs workerBudget(): ~2GiB per plain worker,
~3GiB under istanbul instrumentation, capped by cores−1. Splitting the
SAME total across concurrent module runs keeps the aggregate heap
under the reclaim ceiling instead of multiplying it by the pool size.

### `MODULE_JOBS`

Module-run concurrency: the largest pool where every suite still gets
≥3 workers (below that, per-worker spawn cost outweighs parallelism).
TEST_MODULE_JOBS overrides; 1 restores the old strictly-serial shape.

### `workersEach`

Jest workers granted to each concurrent suite.

### `runModule`

Runs one module's jest suite with piped stdio — output is buffered and
replayed under the module banner on exit so concurrent suites never
interleave report lines.
- `@param` {string} name module name (banner + failure list)
- `@param` {string} config jest.config.mjs path relative to root
- `@returns` {Promise<boolean>} resolves true when the suite passed

### `cursor`

Bounded worker-drain over the selected modules — each slot pulls the
next suite until the list is exhausted. Iterative drain, not recursion:
the tasks are a flat list, not a self-similar structure.
