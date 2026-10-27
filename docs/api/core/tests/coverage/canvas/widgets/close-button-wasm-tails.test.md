# `core\tests\coverage\canvas\widgets\close-button-wasm-tails.test.js`

Coverage tail for the WebGPU/wasm close button path —

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\canvas\widgets\close-button-wasm-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                |

## Members

### `mountResult`

Mutable mount result the mock returns — tests swap per case.

### `mountError`

When set the mock's mount rejects — drives the .catch fallback arm.

### `mockGpu`

Mutable WebGPU capability flag the mock's hasWebGpu reads.

### `fakeWidget`

The fake wasm widget — records every kind-specific setter call.

### `loadClass`

Imports the class under test AFTER the mock is registered.

### `flush`

Flushes the mount promise + a couple of frames.
