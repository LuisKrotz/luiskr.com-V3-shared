# `core\tests\coverage\canvas\widgets\switch-slider-init-tails.test.js`

Coverage tail for switch-slider/init.ts — the exported

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\widgets\switch-slider-init-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                 |

## Members

### `mockGpu`

Mutable mock-state flags — the module mocks below read these per-call,
so tests flip them to steer GPU/mount/gl/build/throw branches.

### `glProgram`

Fake gl-program module — records warn() calls and returns canned programs.

### `makeCanvas`

Canvas stub — null getContext drives the fallback arm.

### `makeHost`

Host surface the init fn reads — canvas + dims, overridable per test.

### `flush`

Short flush — init rAF/observer steps settle within ~20ms.
