# `website\tests\coverage\components\media\expanded-genie-canvas-tails.test.js`

Coverage for website/components/media/expanded/genie-canvas.ts —

|                |                                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\media\expanded-genie-canvas-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                           |

## Members

### `mock2D`

A counting 2D-context stub — records draw calls, canvas backref.

### `makeCanvas`

Canvas with real pixel extents — the genie texture paint needs a size.

### `fakeSheet`

A stubbed composited sheet — `tex` is the baked surface canvas, `ctx`
its recording 2D stub; media/back exercise the live-restamp slots.

### `FROM`

From/to rects the genie transition interpolates between.

### `host`

Bare host element — the genie canvas mounts inside it.

### `bands`

The adaptive band count drawStrips derives from a sheet height.
