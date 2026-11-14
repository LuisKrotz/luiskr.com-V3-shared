# `experiments\star-field\tests\starfield\star-registry.test.js`

Deep-catalog registry — id grammar, manifest/shard lazy

|                |                                                                    |
| -------------- | ------------------------------------------------------------------ |
| **Source**     | `src/experiments\star-field\tests\starfield\star-registry.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.            |

## Members

### `jsonRes`

fetch-Response stub — ok:true with an async json() returning the body.

### `manifest`

Catalog manifest fixture — three kinds across three shards the registry loads.

### `starShard`

Star-shard payload — compact catalog rows (i/n/m/d/s/x/y/z fields).

### `exoShard`

Exoplanet-shard payload — h = host star id linking planet→system.

### `dsoShard`

Deep-sky-object shard — t = object type (G=galaxy), r = radial velocity.

### `routeFetch`

fetch mock that routes URL suffixes to the fixture shards; per-test
overrides merge into (and can replace) the default route table.
