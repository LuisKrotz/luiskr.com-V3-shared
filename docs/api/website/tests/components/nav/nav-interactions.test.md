# `website\tests\components\nav\nav-interactions.test.js`

Deep coverage for AppNav interaction branches: menu

|                |                                                             |
| -------------- | ----------------------------------------------------------- |
| **Source**     | `src/website\tests\components\nav\nav-interactions.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.     |

## Members

### `flush`

Generous flush — nav interaction queues need real timers past microtasks.

### `mount`

Mounts a bare <app-nav> into the document and returns the element.

### `withRoute`

Stubs router.currentRoute for the duration of `fn`, then restores it.
