# `shared\scripts\build\media-manifest.mjs`

CDN media inventory + best-variant resolution shared by the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\media-manifest.mjs`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MEDIA_PREFIX`

Object-name prefix every public media asset lives under on the bucket.

### `LIST_ENDPOINT`

Anonymous `storage.objects.list` endpoint — the bucket is public.

### `IMAGE_VARIANTS`

Image-variant priority for indexing — highest available quality first:
the mozjpeg uncompressed pass, then the raw original, then q50, then the
kodak blur thumb. The first suffix that exists on the bucket wins.

### `VIDEO_CONTENT_VARIANTS`

Video-content priority — full file first, scaledown fallback second.

### `VIDEO_THUMB_VARIANTS`

Poster variants a video can expose, in preference order.

### `IMAGE_THUMB_VARIANTS`

Image thumb/poster priority for previews (og:image, video posters).

### `pickVariant`

First `base`-suffixed key from `variants` that exists in `manifest`.

### (module scope)

Lists every object key under MEDIA_PREFIX → Set of names relative to the
prefix (`metcha/feed/x.jpg`). Returns `null` when the listing fails so
callers can fall back to the historic naming convention.

### `persistMediaManifest`

Writes the key set next to the sitemap artifacts (`<meta>/media-manifest.json`)
so the synchronous locale-page generator can reload it without network.

### `loadMediaManifest`

Reads a previously persisted key set; `null` when absent/unreadable.

### `resolveMediaUrls`

Resolves one media item to crawlable URLs — `{ source, thumb, isVideo }`.

`source` is the highest-quality indexable variant (uncompressed pass →
raw original → q50 → blur thumb); `thumb` is the poster/preview variant.
With no manifest (listing failed) the historic convention is emitted —
`-mozjpg-uncompressed` for images, `.mp4`/`.mp4.jpg-thumb.jpg` for video —
matching the runtime URL builders in `core/utils/media.ts`.

### `resolveCoverKey`

Resolves a home-mosaic cover image to its best indexable key.
