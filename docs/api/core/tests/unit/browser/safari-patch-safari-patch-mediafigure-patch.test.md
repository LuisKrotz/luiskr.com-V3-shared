# `core\tests\unit\browser\safari-patch-safari-patch-mediafigure-patch.test.js`

Split from safari-patch.test.js — covers the "safari-patch — MediaFigure patch" describe.

|                |                                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\unit\browser\safari-patch-safari-patch-mediafigure-patch.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                         |

## Members

### `cls`

Looks up a registered custom element class by tag name.

### `_tick`

~20ms flush — Safari-patch timers + microtasks settle within a tick.
