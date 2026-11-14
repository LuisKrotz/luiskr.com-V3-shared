# `core\tests\coverage\canvas\infra\gl-lifecycle-tails-shared-renderer-purge-restore.test.js`

Split from gl-lifecycle-tails.test.js — covers the "shared-renderer purge/restore" describe.

|                |                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\canvas\infra\gl-lifecycle-tails-shared-renderer-purge-restore.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                                       |

## Members

### `_flush`

Generous flush — GL lifecycle steps need real timers past microtasks.

### `makeCanvas`

Appended canvas — optional class hook the lifecycle maps key on.
