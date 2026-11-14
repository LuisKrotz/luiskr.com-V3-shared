# `website\tests\coverage\components\nav\nav-menu-keys-tails.test.js`

Coverage tails for components/nav/menu.tsx keyboard roving

|                |                                                                         |
| -------------- | ----------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\nav\nav-menu-keys-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                 |

## Members

### `flush`

Generous flush — nav render queues need real timers past microtasks.

### `item`

Fake menu item — records focus() calls without needing a live DOM.

### `menuHost`

Host stub with a scripted item list + a settable shadow activeElement.
