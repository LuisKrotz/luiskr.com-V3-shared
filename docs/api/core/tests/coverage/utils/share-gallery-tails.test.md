# `core\tests\coverage\utils\share-gallery-tails.test.js`

Coverage for core/utils/share-gallery.ts — the playground

|                |                                                             |
| -------------- | ----------------------------------------------------------- |
| **Source**     | `src/core\tests\coverage\utils\share-gallery-tails.test.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.   |

## Members

### `SHARE_A`

Two CDN share URLs — enough to distinguish first/second capture arms.

### `seedHead`

Seeds the head with the card-image metas + the JSON-LD node the
runtime writes against.

### `metaContent`

Reads a head meta tag's content attribute (undefined-safe).

### `graph`

Parses the JSON-LD node the share writer emits.

### `epRoute`

Route fixture for the earth-playground surface.

### `sfRoute`

Route fixture for the star-field surface.

### `baseGraphOf`

Minimal JSON-LD graph — the writer updates primaryImageOfPage.url.
