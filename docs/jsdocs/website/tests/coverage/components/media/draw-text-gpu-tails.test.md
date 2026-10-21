# `website\tests\coverage\components\media\draw-text-gpu-tails.test.js`

Coverage tail for components/media/draw-text/gpu.ts —

| | |
|---|---|
| **Source** | `src/website\tests\coverage\components\media\draw-text-gpu-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `makeDevice`

A fake shared GPUDevice serving the verifyOverlay readback.

### `measuringCtx`

A measuring 2D ctx — glyphs report a real ascent so fillText lands.

### `makeHost`

A host with one char span, ready to reveal.

### `makeWidget`

Recording fake text-draw widget.

### `expectDisarmed`

Runs one verify arm and asserts the mount was disarmed.
