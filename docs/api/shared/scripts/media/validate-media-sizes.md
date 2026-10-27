# `shared\scripts\media\validate-media-sizes.mjs`

Validates every media `size` declared in `database.json`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media\validate-media-sizes.mjs`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `CDN_BASE`

Public object URL prefix — same base the sitemap generator emits.

### `DB_PATH`

database.json at the monorepo root — the CMS export / source of truth.

### `META_DIR`

Persisted manifest next to the sitemap artifacts — listing fallback.

### `HEADER_RANGE`

Bytes fetched per image — JPEG SOF sits inside the first marker run so
~64 KiB usually suffices; 512 KiB covers files carrying large EXIF or
embedded thumbnail APP1 segments before the frame header.

### `IMAGE_DIM_VARIANTS`

Image variants usable for _dimensions_ — same-source derivative passes
only. The kodak MSSIM thumb is excluded deliberately: it is a downscaled
blur-up placeholder and would record the wrong intrinsic size.

### `VIDEO_DIM_VARIANTS`

Video variants — original first, the half-res scaledown never for dims.

### `jpegDims`

Extracts width/height from a JPEG byte stream by scanning markers until
a start-of-frame segment (SOF0–SOF15, excluding DHT/DAC/JPG extension
markers) whose payload carries `precision, height, width`.

### `pngDims`

Extracts width/height from the PNG IHDR (fixed offset 16/20).

### `webpDims`

Extracts width/height from a WebP container: lossy VP8 keeps the 14-bit
dimensions in the frame tag, lossless VP8L packs them into a 28-bit
field, and VP8X stores them as 24-bit minus-one values on the canvas.

### `svgDims`

Reads SVG geometry from the root tag — explicit dims first, viewBox fallback.

### `imageDims`

Probes an image object with a single range GET — JPEG/PNG/WebP headers
are parsed locally so only the first HEADER_RANGE bytes travel.

### `videoDims`

Probes a video object's first video stream geometry via ffprobe over HTTPS.

### `collectMedia`

Collects every media node `{ src, size, isVideo }` in the database.
Returns a Map of `folder + src` → `{ folder, src, size, isVideo, nodes[] }`
where `nodes` holds `{ node, path }` for every locale occurrence — `node`
is the live object reference so `--fix` updates every language at once,
and `path` is the RTDB location (`translations/<loc>/projects/…`) so
`--push` can write the same leaf remotely.

### `pickObject`

Picks the first bucket object whose suffix marks a source-fidelity variant.

### `getManifest`

Loads the live bucket listing, falling back to the persisted manifest.

### `RTDB_URL`

RTDB REST root — multi-path PATCH target for the live CMS database.

### `adcToken`

Reads a Google OAuth2 access token from gcloud Application Default
Credentials — the same auth surface `firebase deploy` uses, so no
service-account key file is needed on a machine that already runs
`gcloud auth application-default login`.

### `pushLive`

Pushes probed intrinsic sizes to the live Firebase RTDB.

Per locale, `translations/<loc>/projects` is fetched once and every
media node's live `size` is compared against the probed value — only
drifted leaves go into the multi-path PATCH, so unchanged rows are
never rewritten and the request stays small even on a fully synced
database (the PATCH body ends up nearly empty).
