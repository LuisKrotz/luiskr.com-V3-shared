# `core\tests\coverage\utils\wasm\wasm-search-tails.test.js`

Coverage tail for utils/wasm/wasm-search.ts — the

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\wasm\wasm-search-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.      |

## Members

### `dispatchReply`

Mutable pool-mock state — dispatch() reads these per-call so tests
steer the reply and record every dispatched payload.

### `items`

Search-row fixtures — title/path/preview fields cover the rank arms.
