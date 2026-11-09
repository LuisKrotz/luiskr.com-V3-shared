# `website\tests\components\canvas\widgets\webgl-widgets-flagwebgl.test.js`

Split from webgl-widgets.test.js — covers the "FlagWebGL" describe.

|                |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\components\canvas\widgets\webgl-widgets-flagwebgl.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                       |

## Members

### `makeCanvas`

Bare canvas — the widget only needs the element handle in these tests.

### `flushFrames`

Frame-tick flush — widget rAF steps need real timers past microtasks.
