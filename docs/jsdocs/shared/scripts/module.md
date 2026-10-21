# `shared\scripts\module.mjs`

| | |
|---|---|
| **Source** | `src/shared\scripts\module.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `moduleScripts`

Reads a module's package.json script table (empty object when absent).
- `@param` {string} root Module directory relative to the repo root.
- `@returns` {Record<string, string>} The scripts map.
