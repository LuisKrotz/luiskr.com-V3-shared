# `website\tests\components\canvas\widgets\canvas-widgets-webglpoolmanager.test.js`

Split from canvas-widgets.test.js — covers the "WebGLPoolManager" describe.

|                |                                                                                       |
| -------------- | ------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\components\canvas\widgets\canvas-widgets-webglpoolmanager.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                               |

## Members

### `makeCanvas`

Bare canvas — the pool only needs the element handle in these tests.

### `_flushFrames`

Frame-tick flush — pool acquisition/rAF steps need real timers.

### `WebGLPoolManager`

The pool's own constructor — webglPool is the module's singleton.

### `_makeRectCanvas`

Canvas with a stubbed getBoundingClientRect — pool sizing reads real boxes.
