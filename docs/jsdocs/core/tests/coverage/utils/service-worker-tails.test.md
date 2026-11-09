# `core\tests\coverage\utils\service-worker-tails.test.js`

Coverage tail for utils/service-worker.ts — the local

|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| **Source**     | `src/core\tests\coverage\utils\service-worker-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.    |

## Members

### `stash`

Stashed property descriptors restored after each test.

### `saveKey`

Snapshots a global key so a test can stub then restore it safely.

### `stubSw`

Installs a fake navigator.serviceWorker + hostname for one test.

### `makeRegistration`

Builds a registration stub with controllable install lifecycle.
