# `website\tests\coverage\components\home\about-glitch-wasm-tails.test.js`

Coverage tail for components/home/about/glitch/wasm.ts —

|                |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\home\about-glitch-wasm-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                      |

## Members

### `mockGpu`

Mutable mock-state flags — the module mocks below read these per-call,
so tests flip them to steer GPU-present/mount-result/decode branches.

### `flush`

Timer flush — mounted render queues need real timers past microtasks.

### `makeSession`

Builds a minimal live session + host pair.

### `makeWidget`

Recording fake widget with the glitch surface.
