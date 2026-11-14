# `core\tests\coverage\canvas\widgets\flag-texture-wasm-tails.test.js`

Coverage tails for the worker-decoded flag texture path:

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\canvas\widgets\flag-texture-wasm-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                |

## Members

### `flush`

Zero-ms flush — the texture path resolves within one macrotask.

### `makeBitmap`

Fake ImageBitmap — sized + close()-able, no pixel data needed.
