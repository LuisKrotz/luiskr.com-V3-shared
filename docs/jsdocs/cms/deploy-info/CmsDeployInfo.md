# `cms\deploy-info\CmsDeployInfo.tsx`

&lt;cms-deploy-info&gt; — the Build tab: renders the

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\deploy-info\CmsDeployInfo.tsx`         |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `CmsDeployInfo`

<cms-deploy-info> — the element facade for the Build tab: holds the
fetch gate (`loading`/`missing`) plus the seven report payloads and
delegates to `data.ts` (parallel fetch) and `render.tsx` (per-report
JSX sections). Each report slot stays null when its file is absent
from the bundle, so a partial deploy-info still renders.

### (module scope)

Fetches the manifest then all five reports in parallel — the index
is the gate (missing bundle → "run yarn deploy:info" hint), each
report degrades independently so a partial bundle still renders.

### `_scoreClass`

Maps a 0–1 score to the green/amber/red chip class (Lighthouse conventions).

### `_pct`

Formats a 0–1 score as a whole percentage; non-numbers render an em-dash.

### `_renderBuildMeta`

Renders the last-build manifest metadata (timestamp, commit, report inventory).

### `_renderLighthouse`

Renders the Lighthouse section (scores + failing audits).

### `_renderScores`

Renders the Lighthouse category score cells for one URL entry.

### `_renderCoverage`

Renders the Jest coverage summary table.

### `_renderBundle`

Renders the bundle inventory (per-type sizes, tiers, wasm crates).

### `_renderAxe`

Renders the axe-core accessibility scan (violations grouped by surface).

### `_renderA11y`

Renders the IBM Equal Access full-site scan (rule rollup + flagged routes).

### `_renderSnyk`

Renders the dependency vulnerability scan (Snyk or yarn-audit fallback).

### `_renderConsoleScan`

Renders the console.* usage scan (debug-leftover policy).

### (module scope)

JSX template — loading/missing gates then the report wall.
