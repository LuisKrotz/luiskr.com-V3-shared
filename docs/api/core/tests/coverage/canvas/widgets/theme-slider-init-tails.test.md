# `core\tests\coverage\canvas\widgets\theme-slider-init-tails.test.js`

Coverage tail for theme-slider/init.ts — the exported

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\canvas\widgets\theme-slider-init-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                |

## Members

### `mockGpu`

Mutable mock-state flags — the module mocks below read these per-call,
so tests flip them to steer GPU/mount/gl/build/throw/RO-callback branches.

### `glProgram`

Fake gl-program module — records warn() calls and returns canned programs.

### `makeCanvas`

Canvas stub — null getContext + canned rect drive the sizing arms.

### `makeHost`

Host surface the init fn reads — canvas + dims, overridable per test.
