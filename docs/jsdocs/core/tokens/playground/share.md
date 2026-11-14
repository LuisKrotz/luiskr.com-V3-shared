# `core\tokens\playground\share.ts`

Playground share-capture contract — the bucket key

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\playground\share.ts`                     |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `SHARE_VIDEO_EXTS`

Video extensions accepted into every share set — a recorded engine capture dropped under a set's share/ prefix joins the sitemap video tags and the JSON-LD VideoObject entries the same way screenshots join the image surfaces.

### `SHARE_DELIVERY_IMAGE_EXTS`

Delivery preference across a capture's encodings — when one screenshot
ships several extensions under a shared stem (`x.png` + a same-resolution
`x.jpg` delivery sibling) the wall/feed/JSON-LD surfaces resolve ONE card
per capture at the smallest bandwidth-friendly encoding, while the `.png`
upload stays the canonical lossless source on the bucket. Order is most
preferred first; `.png` sits last so an un-siblinged capture still mounts
exactly what it always did.

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

### `VIDEO_EXTS`

Video extensions accepted into the share set.

### `DELIVERY_IMAGE_EXTS`

Per-stem encoding preference — one card per capture, smallest delivery format first.

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

### `VIDEO_EXTS`

Video extensions accepted into the share set.

### `DELIVERY_IMAGE_EXTS`

Per-stem encoding preference — one card per capture, smallest delivery format first.
