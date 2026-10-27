# `website\tests\coverage\components\media\draw-text-gpu-tails.test.js`

Coverage tail for components/media/draw-text/gpu.ts —

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\media\draw-text-gpu-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                   |

## Members

### `makeDevice`

A fake shared GPUDevice serving the verifyOverlay readback.

### `until`

Bounded condition poll — the widget mount resolves through an async
module boundary, so a fixed sleep races under parallel coverage load:
the mount can land after the sleep ends (missing the observed state)
or the drive loop can finish before it (state already torn down).
Polling the settle predicate keeps the suite fast when healthy and
resilient under contention; the deadline simply defers to the
assertion, which fails exactly as before.

### `mounted`

Settled = the mount was kept (_gpuHandle) or disarmed (destroy).

### `measuringCtx`

A measuring 2D ctx — glyphs report a real ascent so fillText lands.

### `makeHost`

A host with one char span, ready to reveal.

### `makeWidget`

Recording fake text-draw widget.

### `expectDisarmed`

Runs one verify arm and asserts the mount was disarmed.
