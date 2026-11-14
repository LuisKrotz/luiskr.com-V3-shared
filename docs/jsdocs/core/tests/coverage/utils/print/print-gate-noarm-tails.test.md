# `core\tests\coverage\utils\print\print-gate-noarm-tails.test.js`

Coverage for core/utils/print/print.ts — the install arm

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\print\print-gate-noarm-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.            |

## Members

### `ctrlP`

Builds a Ctrl+P keydown — the env's KeyboardEvent mock drops modifier
props, so a plain cancelable Event carries the two fields the
listener reads.

### `fireBeforePrint`

Dispatches the native beforeprint event the module listens for.

### `fireAfterPrint`

Dispatches the native afterprint event the module listens for.
