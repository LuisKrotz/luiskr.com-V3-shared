# `core\tests\utils\wasm\wasm-utils-gpu-accel.test.js`

Split from wasm-utils.test.js — covers the "gpu-accel" describe.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tests\utils\wasm\wasm-utils-gpu-accel.test.js`  |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `_installTimedRaf`

Replaces rAF with a setTimeout shim — drives frame-based code through real timers.
