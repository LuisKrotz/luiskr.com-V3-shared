# `core/tests/coverage/utils/gpu/webgpu-overlay-tails.test.js`

Coverage tail for utils/gpu/webgpu-overlay.ts — the

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/core/tests/coverage/utils/gpu/webgpu-overlay-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.        |

## Members

### `REC`

f32s per record — mirrors RECORD_F32S in the bridge/input.rs.

### `CAP`

Ring capacity — mirrors RING_CAP.

### `fakeModule`

Builds a fake wasm module + memory the bridge can wire to.

### `ringOf`

Reads the [head, tail] pair + records out of the fake wasm memory.
