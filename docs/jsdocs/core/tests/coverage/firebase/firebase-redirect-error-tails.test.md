# `core\tests\coverage\firebase\firebase-redirect-error-tails.test.js`

Coverage tails for core/firebase.ts — the REJECTED

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\firebase\firebase-redirect-error-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                |

## Members

### `mockAuth`

Fake auth instance — null user + marker so tests can identify it.

### `mockUnsub`

Unsubscribe spy — tests assert listeners detach on the armed path.

### `firebase`

Fresh firebase module import — bound after the mocks are installed.
