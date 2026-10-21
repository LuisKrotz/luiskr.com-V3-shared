# `core\tests\coverage\utils\wasm\wasm-pool-tails.test.js`

Coverage for core/utils/wasm/wasm-pool.ts — the worker

| | |
|---|---|
| **Source** | `src/core\tests\coverage\utils\wasm\wasm-pool-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `makeWorkerStub`

Minimal Worker stand-in — postMessage never replies unless a reply is
wired in, so pending tasks stay in the map until dropped or destroyed.
- `@param` {boolean} reply Whether postMessage schedules a fake reply.
- `@returns` {object} A Worker-shaped stub recorded for assertions.
