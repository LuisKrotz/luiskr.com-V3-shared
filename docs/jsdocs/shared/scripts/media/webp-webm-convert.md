# `shared\scripts\media\webp-webm-convert.mjs`

Batch CDN transcode — every image (jpg/png) and video (mp4)

| | |
|---|---|
| **Source** | `src/shared\scripts\media\webp-webm-convert.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `CONVERT`

Source extensions → target extension + mime type.

### `VIDEO_MAX_BYTES`

Video source size cap — heavier originals keep standing alone.

### `IMAGE_MAX_BYTES`

Image source size cap — anything past 64 MB is a print asset.

### `ffmpegArgs`

ffmpeg per-media conversion. WebP gets a high-quality picture preset;
WebM gets VP9+Opus with row-mt multithreading — cluster output streams
progressively so the file plays while still buffering.
- `@param` {string} src - local source path
- `@param` {string} dst - local target path
- `@param` {string} srcExt - lowercase source extension

### `convertOne`

Downloads one key, transcodes, uploads the sibling, returns a status.

### `main`

Bounded worker pool over the key list.
