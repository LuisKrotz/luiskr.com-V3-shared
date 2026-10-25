# `cms\deploy-info\render.tsx`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\deploy-info\render.tsx`                |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `LIGHTHOUSE_KEYS`

Lighthouse category keys in display order.

### `COVERAGE_KEYS`

Coverage-summary row keys in display order.

### `LINES_METRIC`

The metric the per-module chart bars plot — line coverage, the head-line number.

### `scoreClass`

Maps a 0–1 score to the green/amber/red chip class (Lighthouse conventions).

### `pct`

Formats a 0–1 score as a whole percentage; non-numbers render an em-dash.

### `scoreTone`

Maps a 0–1 score to just the good/warn/bad tone modifier (chart fills).

### `GAUGE_VIEWBOX`

Gauge geometry — a 36-unit viewBox with r = 100 / 2π ≈ 15.9155 makes the
ring circumference exactly 100, so `stroke-dasharray` equals the score
percent directly (the same trick Lighthouse's own gauges use).

### `renderGauge`

One Lighthouse-style ring gauge — an SVG donut whose arc length is the
score percent, colored by the good/warn/bad thresholds, with the number
printed in the hole and the category label underneath. `role="img"` +
`aria-label` gives the graphic a text alternative; the score table below
stays as the full semantic fallback.

- `@param` {string} label Category name (performance/accessibility/…).
- `@param` {unknown} value 0–1 score; non-numbers render an empty ring + "—".

### `BAR_VIEWBOX`

Horizontal-bar geometry — 100-unit-wide svg so fill width equals percent.

### `renderBar`

One labeled horizontal bar — the label, a full-width track with a
proportional fill rect, and the formatted value. `preserveAspectRatio=none`
lets the svg stretch to the row while keeping the 0–100 scale.

- `@param` {string} label Row label (metric name).
- `@param` {number} frac Fill fraction 0–1 (clamped for safety).
- `@param` {string} display Formatted value text shown at the row end.
- `@param` {string} [tone] Modifier class for the fill color.

### `renderStacked`

Stacked distribution bar — one track split into proportional segments
(e.g. violations/potential/recommendation), with the legend printed as
text alongside so the graphic never carries meaning by color alone.

- `@param` segments `[{label, count, tone}]` — counts needn't sum to 100;

### `renderScores`

Renders the score chips for one Lighthouse category set.

### `renderLighthouse`

Renders the Lighthouse section (scores + failing audits).

### `renderCoverage`

Renders the Jest coverage summary table plus the per-module rollup.

### `renderAxe`

Renders the axe-core accessibility scan (violations grouped by surface).

### `a11yLevelClass`

Maps an IBM finding level to the red/amber/green chip (violations red, potentials amber).

### `renderA11y`

Renders the IBM Equal Access full-site scan — totals, per-rule rollup, flagged routes.

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

### `renderBuildMeta`

Renders the last-build manifest metadata — generation timestamp, commit
sha, and the inventory of report files the bundle carries.

### `renderDeployInfo`

JSX template — loading/missing gates then the report wall.
