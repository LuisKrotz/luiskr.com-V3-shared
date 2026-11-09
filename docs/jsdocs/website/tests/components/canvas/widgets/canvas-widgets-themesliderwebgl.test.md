# `website\tests\components\canvas\widgets\canvas-widgets-themesliderwebgl.test.js`

Split from canvas-widgets.test.js — covers the "ThemeSliderWebGL" describe.

|                |                                                                                       |
| -------------- | ------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\components\canvas\widgets\canvas-widgets-themesliderwebgl.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                               |

## Members

### `makeCanvas`

Bare canvas — the widget only needs the element handle in these tests.

### `flushFrames`

Frame-tick flush — widget rAF steps need real timers past microtasks.

### `_WebGLPoolManager`

The pool's own constructor — webglPool is the module's singleton.

### `makeRectCanvas`

Canvas with a stubbed getBoundingClientRect — widget sizing reads real boxes.
