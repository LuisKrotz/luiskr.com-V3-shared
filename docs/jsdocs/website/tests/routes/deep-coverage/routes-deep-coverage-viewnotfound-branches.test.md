# `website\tests\routes\deep-coverage\routes-deep-coverage-viewnotfound-branches.test.js`

Split from routes-deep-coverage.test.js — covers the "ViewNotFound branches" describe.

|                |                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\routes\deep-coverage\routes-deep-coverage-viewnotfound-branches.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                     |

## Members

### `_flush`

Timer flush — view-branch renders settle within a tick or two.

### `origFetch`

Saved globalThis.fetch — the mock is installed per test, restored after.

### `cleanups`

Disposers the tests register — afterEach runs each to undo mounts.
