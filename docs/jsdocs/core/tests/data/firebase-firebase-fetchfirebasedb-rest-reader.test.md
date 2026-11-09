# `core\tests\data\firebase-firebase-fetchfirebasedb-rest-reader.test.js`

Split from firebase.test.js — covers the "firebase — fetchFirebaseDb REST reader" describe.

|                |                                                                             |
| -------------- | --------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\data\firebase-firebase-fetchfirebasedb-rest-reader.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                   |

## Members

### `mockAuth`

Fake auth/db instances — markers let tests identify which mock was used.

### `firebase`

Fresh firebase module import — bound after the mocks are installed.
