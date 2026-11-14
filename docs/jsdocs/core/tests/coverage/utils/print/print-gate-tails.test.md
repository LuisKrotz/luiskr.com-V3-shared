# `core\tests\coverage\utils\print\print-gate-tails.test.js`

Coverage for core/utils/print/print.ts — the gated print

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\print\print-gate-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.      |

## Members

### `fireBeforePrint`

Dispatches the native beforeprint event the module listens for.

### `fireAfterPrint`

Dispatches the native afterprint event the module listens for.

### `ctrlP`

Builds a Ctrl+P keydown the chord listener intercepts. The env's
KeyboardEvent is a mock that drops modifier props, so the event is a
plain cancelable Event carrying the two fields the listener reads —
the same shape the real chord dispatches.

### `flush`

Flushes the runPrintJob continuation past its allSettled await.

### `appImg`

A media element inside #app — the img-eligibility gate — whose decode
the test resolves by hand so the barrier's ordering is observable.
