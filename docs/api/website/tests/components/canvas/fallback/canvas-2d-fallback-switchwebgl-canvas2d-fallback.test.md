# `website\tests\components\canvas\fallback\canvas-2d-fallback-switchwebgl-canvas2d-fallback.test.js`

Split from canvas-2d-fallback.test.js — covers the "SwitchWebGL — Canvas2D fallback" describe.

|                |                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\components\canvas\fallback\canvas-2d-fallback-switchwebgl-canvas2d-fallback.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                                 |

## Members

### `makeCanvas`

Bare canvas — the 2d renderer only needs the element handle here.

### `flushFrames`

Frame-tick flush — widget rAF steps need real timers past microtasks.
