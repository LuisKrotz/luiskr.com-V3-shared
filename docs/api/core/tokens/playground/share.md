# `core\tokens\playground\share.ts`

Playground share-capture contract — the bucket key

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\playground\share.ts`                     |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `EARTH_SHARE`

Earth Playground share-capture tokens. Sole declaration site — consumers
(build generators, runtime share rotation) import members from this
frozen map rather than re-declaring the literals (zero-hardcoding rule).

### `PREFIX`

Bucket key prefix (relative to the media manifest root) every share capture lives under.

### `MANIFEST_URL`

Site-served JSON manifest of the share set — emitted at build time, fetched lazily by the runtime rotation.

### `IMAGE_EXTS`

Image extensions accepted into the share set.

### `STAR_SHARE`

Star Field share-capture tokens — the star-field experiment's parallel
of EARTH_SHARE: engine screenshots under the star-field share/ prefix
feed the same og:image rotation, sitemap image tags, parked gallery
and JSON-LD ImageObject ItemList surfaces.

### `PREFIX`

Bucket key prefix (relative to the media manifest root) every share capture lives under.

### `MANIFEST_URL`

Site-served JSON manifest of the share set — emitted at build time, fetched lazily by the runtime rotation.

### `IMAGE_EXTS`

Image extensions accepted into the share set.
