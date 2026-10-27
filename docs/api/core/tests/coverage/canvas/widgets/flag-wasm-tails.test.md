# `core\tests\coverage\canvas\widgets\flag-wasm-tails.test.js`

Coverage tail for the WebGPU/wasm flag path — init's

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\widgets\flag-wasm-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.        |

## Members

### `mountResult`

Mutable mount result the mock returns — tests swap per case.

### `mockGpu`

Mutable WebGPU capability flag the mock's hasWebGpu reads.

### `decodeResult`

Mutable decoder result — null simulates a decode failure.

### `fakeWidget`

The fake wasm widget — records every kind-specific setter call.

### `decodeThrow`

Mutable decoder throw flag — simulates a rejecting decode.

### `loadModules`

Imports the class + anim/loop modules AFTER the mocks are registered.

### `flush`

Flushes the mount + decode promises and a couple of frames.
