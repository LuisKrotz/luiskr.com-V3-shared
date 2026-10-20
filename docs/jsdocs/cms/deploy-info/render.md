# `cms/deploy-info/render.tsx`

|                |                                                      |
| -------------- | ---------------------------------------------------- |
| **Source**     | `src/cms/deploy-info/render.tsx`                     |
| **UX surface** | Deploy reports viewer — lighthouse, coverage, scans. |

## Members

### `LIGHTHOUSE_KEYS`

Lighthouse category keys in display order.

### `COVERAGE_KEYS`

Coverage-summary row keys in display order.

### `scoreClass`

Maps a 0–1 score to the green/amber/red chip class (Lighthouse conventions).

### `pct`

Formats a 0–1 score as a whole percentage; non-numbers render an em-dash.

### `renderScores`

Renders the score chips for one Lighthouse category set.

### `renderLighthouse`

Renders the Lighthouse section (scores + failing audits).

### `renderCoverage`

Renders the Jest coverage summary table.

### `renderAxe`

Renders the axe-core accessibility scan (violations grouped by surface).

### `renderSnyk`

Renders the dependency vulnerability scan (Snyk or yarn-audit fallback).

### `BYTE_UNITS`

Byte-size units for the bundle tables — KB/MB/GB with one decimal.

### `fmtBytes`

Formats a byte count as a compact human size (B/KB/MB/GB, one
decimal past the byte unit); non-numbers render an em-dash.

- `@param` {unknown} value Byte count from the bundle-stats report.
- `@returns` {string} The formatted size.

### `BUNDLE_TOTAL_KEYS`

Bundle-rollup row order — the file-type totals in display order.

### `bundleRow`

One size row for a bucket — files, minified, unminified, gzip, brotli.

### `renderBundle`

Renders the post-build bundle inventory (emitted sizes per type, tier, crate).

### `renderConsoleScan`

Renders the console.* usage scan (debug-leftover policy).

### `renderDeployInfo`

JSX template — loading/missing gates then the five-section report wall.
