# `core\tests\coverage\utils\print\print-oracle-tails.test.js`

Coverage for core/utils/print/print.ts — the print-CSS

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\print\print-oracle-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.        |

## Members

### `fireBeforePrint`

Dispatches the native beforeprint event the module listens for.

### `fireAfterPrint`

Dispatches the native afterprint event the module listens for.

### `flush`

Flushes the runPrintJob continuation past its async settles.

### `SEL_NESTED_HIDE`

Fixture-only selector the nested @media block hides on paper.

### `SEL_SUPPORTS_HIDE`

Fixture-only selector the @supports block hides on paper.

### `SEL_VISIBLE`

Fixture-only selector that stays painted under print.

### `MANIFEST_KEYS`

Bucket keys the stubbed manifest claims exist for these fixtures.

### `appShell`

An #app shell — the media-walk eligibility anchor — with the given
children seated inside.

- `@param` {...Node} kids Children to append inside the shell.
- `@returns` {HTMLElement} the shell element

### `mkBleedFigure`

A bleed candidate: media-figure host carrying a proven stem whose
shadow img reports a portrait ratio — tags BLEED without the
landscape variant.

- `@returns` {HTMLElement} the figure host
