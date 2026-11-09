# `experiments\star-field\tests\coverage\starfield\engine\starfield-registry-tails.test.js`

Coverage tails for the 139k registry surface on

|                |                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\engine\starfield-registry-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                       |

## Members

### `manifest`

Catalog manifest fixture — two kinds across two shards the registry loads.

### `starShard`

Star-shard payload — compact catalog rows (i/n/m/d/s/x/y/z fields).

### `exoShard`

Exoplanet-shard payload — h = host star id linking planet→system.

### `regFetch`

fetch mock that routes URL suffixes to the fixture shards above.

### `flush`

Timer flush — lets queued registry-load microtasks drain between steps.

### `mount`

Mounts a <view-star-field> element into the body and returns it.

### `unmount`

Runs the element's teardown then removes it from the DOM — full unmount.

### `waitFor`

Poll-until-true wait — async engine stages complete at unbounded
times, so this ticks every 15ms until pred() or the 10s deadline.
