# `core\tests\unit\browser\safari-patch-safari-patch-retroactive-cleanup.test.js`

Split from safari-patch.test.js — covers the "safari-patch — retroactive cleanup" describe.

|                |                                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\unit\browser\safari-patch-safari-patch-retroactive-cleanup.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                           |

## Members

### `_cls`

Looks up a registered custom element class by tag name.

### `_tick`

~20ms flush — Safari-patch timers + microtasks settle within a tick.
