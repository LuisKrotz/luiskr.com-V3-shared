# `core\tests\coverage\utils\wasm\wasm-scroll-tails-2.test.js`

Split from coverage-tails-5.test.js — covers the "wasm-scroll tails 2" describe.

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\wasm\wasm-scroll-tails-2.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.        |

## Members

### `flush`

Generous flush — wasm scroll steps need real timers past microtasks.
