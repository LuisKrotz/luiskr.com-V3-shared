# `core\tests\coverage\utils\dom\orphan-seps-tails.test.js`

Coverage for core/utils/dom/orphan-seps.ts — the footer

|                |                                                               |
| -------------- | ------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\dom\orphan-seps-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.     |

## Members

### `capturedRoCb`

Captured RO instance + callback for refire tests.

### `lastRo`

The most recent stub RO — tests refire its callback directly.

### `MockRO`

Minimal ResizeObserver stub recording observe/disconnect.

### `makeNav`

Builds a nav with `count` pair spans whose tops come from `tops`.
