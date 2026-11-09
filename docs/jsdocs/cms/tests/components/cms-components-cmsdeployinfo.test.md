# `cms\tests\components\cms-components-cmsdeployinfo.test.js`

Split from cms-components.test.js — covers the "CmsDeployInfo" describe.

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/cms\tests\components\cms-components-cmsdeployinfo.test.js` |
| **UX surface** | Admin bundle — editors for every database node.                 |

## Members

### `setCalls`

Recorded values the set() mock observed — write assertions inspect this.

### `removeCalls`

Recorded paths the remove() mock observed — delete assertions.

### `getCalls`

Recorded paths the get() mock observed — read assertions.

### `mount`

Mounts an element by tag and waits 60ms for its async mount lifecycle to settle.
