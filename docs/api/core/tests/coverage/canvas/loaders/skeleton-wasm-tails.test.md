# `core\tests\coverage\canvas\loaders\skeleton-wasm-tails.test.js`

Coverage tail for the WebGPU/wasm skeleton path —

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\loaders\skeleton-wasm-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.            |

## Members

### `mountResult`

Mutable mount result the mock returns — tests swap per case.

### `mockGpu`

Mutable WebGPU capability flag the mock's hasWebGpu reads.

### `fakeWidget`

The fake wasm widget — records every kind-specific setter call.

### `loadLayer`

Imports the class under test AFTER the mock is registered.

### `flush`

Flushes the mount promise + a frame.

### `makeHost`

Mounted host trio (host/root/content) with a stubbed outer rect.

### `makeSkel`

Skeleton element with a canned class + rect the wasm loader measures.
