# `core\tests\unit\platform\polyfill-coverage-core-legacy-polyfills-wrappers.test.js`

Split from polyfill-coverage.test.js — covers the "core/legacy-polyfills wrappers" describe.

|                |                                                                                         |
| -------------- | --------------------------------------------------------------------------------------- |
| **Source**     | `src/core\tests\unit\platform\polyfill-coverage-core-legacy-polyfills-wrappers.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.                               |

## Members

### `cssVarsMock`

Ponyfill spy — tests assert the polyfill chain invoked it.

### `ResizeObserverShim`

Minimal RO polyfill stand-in — the install only needs the class shape.

### `stash`

Stashed globals, restored after each test. Descriptors are captured
(not values) so accessor properties like HTMLElement.prototype.inert
don't invoke their getter against the prototype itself.

### `saveKey`

Snapshots a global key so a test can stub then restore it safely.
