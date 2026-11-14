# `core\tests\unit\browser\safari-patch-safari-patch-mediaexpanded-fake-contexts.test.js`

Split from safari-patch.test.js — covers the "safari-patch — MediaExpanded fake contexts" describe.

|                |                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\unit\browser\safari-patch-safari-patch-mediaexpanded-fake-contexts.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                                   |

## Members

### `cls`

Looks up a registered custom element class by tag name.

### `_tick`

~20ms flush — Safari-patch timers + microtasks settle within a tick.
