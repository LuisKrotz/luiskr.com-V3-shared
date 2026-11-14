# `shared\scripts\build\media-manifest.mjs`

CDN media inventory + best-variant resolution shared by the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\media-manifest.mjs`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MEDIA_PREFIX`

Object-name prefix every public media asset lives under on the bucket.

### `MEDIA_BUCKET`

Media bucket name — sole declaration site for gs:// + API endpoints.

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

### `STALE_MEDIA_KEYS`

Retention-locked stale video-poster webp keys — emitted by an older
poster pass that captured each clip's t=0 loading slate (gray splash,
black title card, or language gate). The `.mp4.jpg` poster families
were regenerated mid-clip and re-uploaded, but these `.webp` objects
sit under the bucket's locked 31-day retention window and cannot be
overwritten until it lapses. Keeping them out of the manifest drops
`webpIfExists()` offers back to the fresh `.jpg` posters instead of
serving the stale frames. Remove each entry once its object is
re-emitted and verified — verification walks `media-manifest.json`
pixel-variance, not filename presence.

### `dropStaleMediaKeys`

Drops the retention-locked stale keys from a manifest key set so
nothing downstream (runtime webpIfExists, build-time variant picking)
can offer a stale sibling. Applied on both the fetch and the persisted
load paths — a stale JSON artifact predating the filter must not
resurrect the keys.

- `@param` keys Mutable Set of manifest keys relative to MEDIA_PREFIX.
- `@returns` The same set, minus every stale key.

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

### `DIMS_PROBE_BYTES`

Bytes fetched per image-dims probe — SOF/IHDR headers live in the head.

### `scanImageDims`

Scans an image header for intrinsic dims — PNG IHDR (8-byte signature)
or JPEG SOFn marker walk (FFD8 + length-prefixed segments; SOF markers
are C0–CF except DHT/DAC/RST: C4, C8, CC). Returns [w, h] or null.

- `@param` {Buffer} buf - head bytes of the image

### (module scope)

Probes a set of absolute image URLs for intrinsic dims — one 64 KB
range request per unique URL (the IHDR/SOF headers sit in the head).
Failures are silent: an unreachable or unparseable asset simply has
no entry in the returned map.

- `@param` {string[]} urls absolute image URLs to probe
- `@param` {number} timeoutMs per-request ceiling
- `@returns` {Promise<Map<string, number[]>>} URL → [w, h]
