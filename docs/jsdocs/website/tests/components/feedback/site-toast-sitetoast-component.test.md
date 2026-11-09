# `website\tests\components\feedback\site-toast-sitetoast-component.test.js`

Split from site-toast.test.js — covers the "SiteToast component" describe.

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\components\feedback\site-toast-sitetoast-component.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                        |

## Members

### `_flush`

Zero-ms flush — toast queue drains within one macrotask.

### `loadNotify`

Fresh notify module (fresh _seen/_toastEl/_globalBound state) per call.

### `mountToast`

Mounts a toast element, returning it.

### `items`

Lists the toast item elements inside the component's shadow root.
