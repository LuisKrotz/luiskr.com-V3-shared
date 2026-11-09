# `shared\scripts\verify\coverage-gate.mjs`

Per-file coverage enforcement, per module. Jest's

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\verify\coverage-gate.mjs`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MODULES`

Module → { root, src }: the module directory (where reports/coverage
lands) and its authored-source roots (relative to repo root). Mirrors
the jest.config.mjs collectCoverageFrom scopes: shared covers only
shared/src, the rest cover their whole tree minus the excluded
generated/test dirs below.

### `pct`

Percent covered — an empty metric (0 constructs) counts as 100%.

### `listSrc`

Recursive .ts/.tsx/.js collector honoring the SKIP_DIRS set.
