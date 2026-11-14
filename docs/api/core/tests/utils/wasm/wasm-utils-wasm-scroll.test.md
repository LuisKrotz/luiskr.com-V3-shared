# `core\tests\utils\wasm\wasm-utils-wasm-scroll.test.js`

Split from wasm-utils.test.js — covers the "wasm-scroll" describe.

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| **Source**     | `src/core\tests\utils\wasm\wasm-utils-wasm-scroll.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.  |

## Members

### `installTimedRaf`

Replaces rAF with a setTimeout shim reporting fake +30ms timestamps —
drives frame-based code through real timers without a real rAF.
