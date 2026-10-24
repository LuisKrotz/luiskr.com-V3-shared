# `core\tests\coverage\utils\print\print-tails.test.js`

Coverage for core/utils/print/print.ts — the beforeprint/

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\print\print-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `fireBeforePrint`

Dispatches the native beforeprint event the module listens for.

### `fireAfterPrint`

Dispatches the native afterprint event the module listens for.

### `mkArticle`

Builds a reader mirror article in <body> — the hoisted post-mount state
every swap path checks against.

- `@returns` {HTMLElement} the article element
