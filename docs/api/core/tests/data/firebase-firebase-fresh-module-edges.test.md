# `core\tests\data\firebase-firebase-fresh-module-edges.test.js`

Split from firebase.test.js — covers the "firebase — fresh module edges" describe.

|                |                                                                    |
| -------------- | ------------------------------------------------------------------ |
| **Source**     | `src/core\tests\data\firebase-firebase-fresh-module-edges.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.          |

## Members

### `mockAuth`

Fake auth/db instances — markers let tests identify which mock was used.

### `_firebase`

Fresh firebase module import — bound after the mocks are installed.
