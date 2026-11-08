# `core\tests\coverage\utils\dom\joust-tails.test.js`

Coverage for core/utils/dom/joust.ts — the click-to-reveal

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\dom\joust-tails.test.js`   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `stubMatchMedia`

Mirrors the setup.js matchMedia mock shape with a switchable `matches`.

### `makeChip`

A joust chip: `joust` root button hosting a `joust-label` span.

### `clickChip`

Dispatches a real MouseEvent click and returns the gate result the handler saw.
