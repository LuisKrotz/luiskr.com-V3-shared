# `shared\scripts\test\merge-coverage.mjs`

Unions the raw coverage maps each module's Jest run wrote to

| | |
|---|---|
| **Source** | `src/shared\scripts\test\merge-coverage.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MODULES`

Module → { root, src } mirrors coverage-gate.mjs: `root` is where reports
land, `src` the authored-source roots whose files enter the filtered map.
Sourced from discoverModules() so scaffolded experiments self-register.
