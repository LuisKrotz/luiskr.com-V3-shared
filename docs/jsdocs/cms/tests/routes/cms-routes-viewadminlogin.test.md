# `cms\tests\routes\cms-routes-viewadminlogin.test.js`

Split from cms-routes.test.js — covers the "ViewAdminLogin" describe.

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| **Source**     | `src/cms\tests\routes\cms-routes-viewadminlogin.test.js` |
| **UX surface** | Admin bundle — editors for every database node.          |

## Members

### `authCallbacks`

Auth-state callbacks captured by the onAuthChange mock — tests fire them.

### `setCalls`

Recorded {path, value} pairs the set() mock observed — write assertions.

### `snapVal`

Opaque RTDB snapshot payload — the values are never asserted, only rendered.

### `mount`

Mounts a custom element by tag into document.body and returns it.

### `_flush`

Generous flush — mounted render queues need real timers past microtasks.
