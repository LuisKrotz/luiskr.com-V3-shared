# `shared\scripts\verify\coverage-gaps.mjs`

| | |
|---|---|
| **Source** | `src/shared\scripts\verify\coverage-gaps.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Reports uncovered statements / branches / functions for a source file from
coverage/coverage-final.json. Coordinates are transformed-space; use the
--source-map decode when the JSX transformer emits maps.

Reads every module's reports/coverage/coverage-final.json (per-module
reports — see shared/tests/jest.preset.mjs) and searches them all.

Usage: node shared/scripts/verify/coverage-gaps.mjs <src-relative-path...>
