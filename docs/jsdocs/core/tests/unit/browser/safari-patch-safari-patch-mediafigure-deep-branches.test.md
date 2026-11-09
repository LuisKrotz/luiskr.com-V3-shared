# `core\tests\unit\browser\safari-patch-safari-patch-mediafigure-deep-branches.test.js`

Split from safari-patch.test.js — covers the "safari-patch — MediaFigure deep branches" describe.

|                |                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\unit\browser\safari-patch-safari-patch-mediafigure-deep-branches.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                                 |

## Members

### `cls`

Looks up a registered custom element class by tag name.

### `tick`

~20ms flush — Safari-patch timers + microtasks settle within a tick.
