# `core\tests\unit\platform\polyfill-coverage-registerserviceworker.test.js`

Split from polyfill-coverage.test.js — covers the "registerServiceWorker" describe.

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Source**     | `src/core\tests\unit\platform\polyfill-coverage-registerserviceworker.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                      |

## Members

### `cssVarsMock`

Ponyfill spy — tests assert the SW-era shim invoked it.

### `ResizeObserverShim`

Minimal RO polyfill stand-in — the ponyfill only needs the class shape.

### `registerMock`

SW-registration spy — tests assert drop/register calls against it.

### `stash`

Stashed globals, restored after each test. Descriptors are captured
(not values) so accessor properties like HTMLElement.prototype.inert
don't invoke their getter against the prototype itself.

### `_saveKey`

Snapshots a global key so a test can stub then restore it safely.
