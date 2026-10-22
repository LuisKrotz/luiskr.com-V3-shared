# `core\tests\coverage\utils\ml\frame-time.test.js`

Coverage for core/utils/ml/frame-time.ts — the ring

| | |
|---|---|
| **Source** | `src/core\tests\coverage\utils\ml\frame-time.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `flushAsync`

Flushes pending microtasks so fire-and-forget inference settles.

### `cycle`

Runs one full inference cycle — INFER_EVERY records + settle.
