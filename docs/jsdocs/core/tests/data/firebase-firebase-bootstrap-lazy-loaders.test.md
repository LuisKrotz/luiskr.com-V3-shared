# `core\tests\data\firebase-firebase-bootstrap-lazy-loaders.test.js`

Split from firebase.test.js — covers the "firebase — bootstrap & lazy loaders" describe.

|                |                                                                        |
| -------------- | ---------------------------------------------------------------------- |
| **Source**     | `src/core\tests\data\firebase-firebase-bootstrap-lazy-loaders.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.              |

## Members

### `mockAuth`

Fake auth/db instances — markers let tests identify which mock was used.

### `fetchMock`

probeAuthBackend re-issues the createAuthUri REST call after an opaque
auth/internal-error — stub fetch globally so tests never hit the
network. The default ok:true response makes the probe return empty
(no server message → the redirect fallback stays eligible).

### `firebase`

Fresh firebase module import — bound after the mocks are installed.
