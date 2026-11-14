# `cms\tests\editors\cms-editors-cmsfootereditor.test.js`

Split from cms-editors.test.js — covers the "CmsFooterEditor" describe.

|                |                                                             |
| -------------- | ----------------------------------------------------------- |
| **Source**     | `src/cms\tests\editors\cms-editors-cmsfootereditor.test.js` |
| **UX surface** | Admin bundle — editors for every database node.             |

## Members

### `setCalls`

Recorded values the set() mock observed — write assertions inspect this.

### `snapVal`

Shared RTDB snapshot payload served by the get() mock for every read.

### `mount`

Mounts a custom element by tag into document.body and returns it.

### `flush`

Generous flush — mounted render queues need real timers past microtasks.
