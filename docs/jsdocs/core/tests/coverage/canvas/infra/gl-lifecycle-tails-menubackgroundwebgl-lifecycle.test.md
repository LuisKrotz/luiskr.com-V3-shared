# `core\tests\coverage\canvas\infra\gl-lifecycle-tails-menubackgroundwebgl-lifecycle.test.js`

Split from gl-lifecycle-tails.test.js — covers the "MenuBackgroundWebGL lifecycle" describe.

|                |                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\infra\gl-lifecycle-tails-menubackgroundwebgl-lifecycle.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                                       |

## Members

### `_flush`

Generous flush — GL lifecycle steps need real timers past microtasks.

### `makeCanvas`

Appended canvas — optional class hook the lifecycle maps key on.
