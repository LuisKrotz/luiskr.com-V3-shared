# `website\tests\routes\deep-coverage\routes-deep-coverage-viewlegal-branches.test.js`

Split from routes-deep-coverage.test.js — covers the "ViewLegal branches" describe.

|                |                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\routes\deep-coverage\routes-deep-coverage-viewlegal-branches.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                  |

## Members

### `flush`

Timer flush — view-branch renders settle within a tick or two.

### `origFetch`

Saved globalThis.fetch — the mock is installed per test, restored after.

### `cleanups`

Disposers the tests register — afterEach runs each to undo mounts.
