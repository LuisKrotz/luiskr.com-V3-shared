# `website\tests\coverage\components\home\mosaic-burn-word-boxes-tails.test.js`

Coverage tails for mosaic/burn/paper.js — the DOM Range

| | |
|---|---|
| **Source** | `src/website\tests\coverage\components\home\mosaic-burn-word-boxes-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `recCtx`

Recording 2d ctx — tracks fillText/measureText calls, swallows the rest.

### `stubPaper`

Paper stub — rasterizeTitle only reads width + getContext.

### `titleWith`

h2 whose only child is the given text node.

### `rangeSeq`

Range stub returning `rects[i]` per created range, in call order.
