# `shared\scripts\verify\chunk-budget.mjs`

Minified chunk-size gate. Scans dist/v/&lt;tier&gt;/assets/{js,css}

| | |
|---|---|
| **Source** | `src/shared\scripts\verify\chunk-budget.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `BUDGETS`

Hard caps on emitted file size (bytes).

### `EXEMPT_TIERS`

Tiers exempt from the gate — every `legacy` tier is intentionally
monolithic because ES5-era engines cannot load module chunks.

### `nameKey`

Exception patterns are regex strings matched against the emitted file's
name-without-hash (e.g. `three.webgpu` matches `three.webgpu-CkO-_Y2V.js`
across every tier).

### `collectFiles`

Recursively collects emitted .js/.css files under a tier's assets dir.
