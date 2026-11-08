# `shared\scripts\build\playground-share.mjs`

Playground share-capture helpers shared by the build-time

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\playground-share.mjs`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `shareImageKeys`

Every share-capture key on the bucket manifest, sorted — keys are
relative to the media manifest root (`experiments/…`), matching
media-manifest.mjs's convention. Returns [] when the manifest listing
is absent so callers keep their pre-share-set behaviour.

- `@param` {Set<string>|null} manifest bucket key set (or null)
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@returns` {string[]} sorted share-capture keys

### `shareImageUrls`

Manifest → CDN-absolute share URLs (unencoded — callers encode at
emission time through their own `enc`/`encLoc` helpers).

- `@param` {Set<string>|null} manifest bucket key set (or null)
- `@param` {string} cdnBase CDN base URL the keys resolve against
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@returns` {string[]} absolute share-image URLs

### `shareVideoKeys`

Every share-capture video key on the bucket manifest, sorted — a
recorded engine clip under a set's share/ prefix feeds the sitemap
video tags and the JSON-LD VideoObject entries with the same
drop-a-file contract as the image captures. Returns [] when the
manifest listing is absent so callers keep their image-only
behaviour.

- `@param` {Set<string>|null} manifest bucket key set (or null)
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@returns` {string[]} sorted share-video keys

### `shareVideoUrls`

Manifest → CDN-absolute share-video URLs (unencoded — callers encode
at emission time through their own `enc`/`encLoc` helpers).

- `@param` {Set<string>|null} manifest bucket key set (or null)
- `@param` {string} cdnBase CDN base URL the keys resolve against
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@returns` {string[]} absolute share-video URLs

### `shareManifestDoc`

The runtime share manifest payload — emitted to the set's
`MANIFEST_URL` under `website/public/meta/` so the SPA can rotate
og:image through the whole set without knowing the bucket listing.
`videos` lists any recorded engine clips under the same prefix — the
runtime reads `images` today, the extra key is additive for the
sitemap/video-entity consumers.

- `@param` {string[]} urls absolute share-image URLs
- `@param` {string} cdnBase CDN base URL
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@param` {string[]} [videoUrls] absolute share-video URLs
- `@returns` {object} serializable manifest document

### `shuffled`

Fisher–Yates copy — a fresh permutation per build so consecutive
emitted pages draw different share images while every capture stays in
the rotation. The input array is never mutated.

- `@param` {Array} arr source array
- `@returns` {Array} shuffled copy
