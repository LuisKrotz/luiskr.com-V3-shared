# `website\tests\coverage\components\search\route-search-sync-tails.test.js`

Coverage tails for components/search/RouteSearch.tsx — the

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Source**     | `src/website\tests\coverage\components\search\route-search-sync-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                        |

## Members

### `S`

Shadow-DOM selector bundle for the route-search element surface.

### `flush`

Short flush — sync tails poll frequently so each tick stays cheap.

### `waitFor`

Polls `fn` until it returns truthy — async UI has no fixed settle tick.
