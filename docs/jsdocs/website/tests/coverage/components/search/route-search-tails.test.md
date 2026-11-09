# `website\tests\coverage\components\search\route-search-tails.test.js`

Coverage tail for components/search/route-search/data.ts —

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/website\tests\coverage\components\search\route-search-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                   |

## Members

### `dbReply`

Per-test control over the SWR snapshot the loader consumes.

### `dbThrow`

When set, the db mock rejects with this error instead of replying.

### `wait`

Fixed 40ms wait — the SWR loader resolves within one timer pass.
