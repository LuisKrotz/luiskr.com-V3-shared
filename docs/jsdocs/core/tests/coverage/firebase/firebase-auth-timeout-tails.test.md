# `core\tests\coverage\firebase\firebase-auth-timeout-tails.test.js`

Coverage tails for core/firebase.ts — the bounded

|                |                                                                        |
| -------------- | ---------------------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\firebase\firebase-auth-timeout-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.              |

## Members

### `mockAuth`

Fake auth instance — null user + marker so tests can identify it.

### `mockUnsub`

Unsubscribe spy — tests assert the timeout path detaches listeners.

### `firebase`

Fresh firebase module import — bound after the auth mock is installed.

### `flush`

Zero-ms flush — promise chains resolve within one macrotask.
