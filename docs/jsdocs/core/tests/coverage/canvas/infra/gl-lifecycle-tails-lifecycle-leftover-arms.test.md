# `core\tests\coverage\canvas\infra\gl-lifecycle-tails-lifecycle-leftover-arms.test.js`

Split from gl-lifecycle-tails.test.js — covers the "lifecycle leftover arms" describe.

|                |                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\infra\gl-lifecycle-tails-lifecycle-leftover-arms.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                                 |

## Members

### `flush`

Generous flush — GL lifecycle steps need real timers past microtasks.

### `makeCanvas`

Appended canvas — optional class hook the lifecycle maps key on.
