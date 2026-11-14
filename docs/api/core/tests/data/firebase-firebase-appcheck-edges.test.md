# `core\tests\data\firebase-firebase-appcheck-edges.test.js`

Covers ensureAppCheck() in core/firebase.ts — the

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Source**     | `src/core\tests\data\firebase-firebase-appcheck-edges.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.      |

## Members

### `mockAuth`

Fake auth/db instances — markers let tests identify which mock was used.

### `mockInitAppCheck`

AppCheck-init spy — returns a marker instance so tests see the arm used.
