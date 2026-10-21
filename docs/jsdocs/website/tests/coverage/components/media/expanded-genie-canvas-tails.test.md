# `website\tests\coverage\components\media\expanded-genie-canvas-tails.test.js`

Coverage for website/components/media/expanded/genie-canvas.ts —

| | |
|---|---|
| **Source** | `src/website\tests\coverage\components\media\expanded-genie-canvas-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `mock2D`

A counting 2D-context stub — records draw calls, canvas backref.

### `fakeSheet`

A stubbed composited sheet — `tex` is the baked surface canvas, `ctx`
its recording 2D stub; media/back exercise the live-restamp slots.

### `bands`

The adaptive band count drawStrips derives from a sheet height.
