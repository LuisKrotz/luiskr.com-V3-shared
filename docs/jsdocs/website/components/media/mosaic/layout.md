# `website\components\media\mosaic\layout.ts`

Layout passes for &lt;media-mosaic&gt; — measures the wall (or

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\mosaic\layout.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `estimateWallWidth`

Predicted wall width before the element is measured: viewport minus the
grid gutters the %MAXAREA host padding applies — the same contract the
project view uses for its pre-render height estimate.

- `@returns` Estimated wall content width in px (0 without a viewport).

### `wallWidth`

Live wall width — the packed container's content-box measurement when it
exists (post-render), else the viewport estimate (pre-render pack so the
first painted frame already carries positioned tiles).

- `@param` host The MediaMosaic element.
- `@returns` Wall width in px.

### `relayout`

Single layout pass: repacks when the wall width changed (or tiles were
never packed — e.g. first configure before the wall existed) and applies
tile positions + wall height imperatively. Skipped on the compact
carousel path and on empty data. Reads (clientWidth) happen before any
style writes in the same pass — no write→read reflow.

- `@param` host The MediaMosaic element.

### `scheduleLayout`

Debounced repack — resize/RO paths coalesce into one rAF.

### `applyTileStyles`

Writes packed geometry into the DOM: wall height on the container and
each tile's absolute box. Post-render refreshes are no-ops when the JSX
already emitted the same inline styles (the pack is deterministic).

- `@param` host The MediaMosaic element.
