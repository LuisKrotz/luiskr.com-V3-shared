# `website\tests\components\canvas\widgets\webgl-widgets-syncskeletonlayer-helpers.test.js`

Split from webgl-widgets.test.js — covers the "syncSkeletonLayer helpers" describe.

|                |                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\components\canvas\widgets\webgl-widgets-syncskeletonlayer-helpers.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                       |

## Members

### `_makeCanvas`

Bare canvas — the layer-sync helpers only need the element handle.

### `_flushFrames`

Frame-tick flush — widget rAF steps need real timers past microtasks.
