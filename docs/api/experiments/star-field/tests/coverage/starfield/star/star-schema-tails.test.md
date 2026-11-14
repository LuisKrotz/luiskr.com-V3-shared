# `experiments\star-field\tests\coverage\starfield\star\star-schema-tails.test.js`

Coverage tails for star/schema.ts — the runtime JSON-LD

|                |                                                                                      |
| -------------- | ------------------------------------------------------------------------------------ |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\star\star-schema-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                              |

## Members

### `flush`

Timer flush — schema emission happens after async route/data settles.

### `graphPayload`

Reads and parses the injected JSON-LD script tag — null when absent.

### `SF_ROUTE`

Route-record factory matching the router's shape; per-test overrides merge in.

### `MANIFEST`

Catalog manifest the schema paths read — 3 kinds, dso has no shards.

### `view`

View stub carrying only the fields schema generation reads.
