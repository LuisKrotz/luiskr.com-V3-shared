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

One capture may ship several encodings under a shared stem — the
canonical `.png` upload plus a same-resolution `.jpg`/`.webp` delivery
sibling emitted so the media wall doesn't pull a multi-megabyte PNG for
a card-size tile. Stems dedupe against `DELIVERY_IMAGE_EXTS`: the first
preference present wins, so surfaces mount one card per capture at the
smallest encoding the bucket actually holds (a capture with no delivery
sibling keeps mounting its `.png`, unchanged).

- `@param` {Set<string>|null} manifest bucket key set (or null)
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@returns` {string[]} sorted share-capture keys, one per capture stem

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

### `shareVideoStem`

Extensionless manifest key of a share-video key — `…/clip.mp4` →
`…/clip`, matching the stem the runtime's <media-figure> variant
grammar resolves posters/sources against. Non-video extensions pass
through untouched.

- `@param` {string} key manifest-relative share key
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@returns` {string} extensionless stem key

### (module scope)

Probes intrinsic dims for a whole share set — image captures scan
their own head bytes; video clips take their poster sibling's dims
(a frame grab shares the clip's box) resolved through the bucket
manifest so only proven thumb variants are requested. A clip with no
poster on the bucket — and any capture that fails to probe — simply
carries no entry; the runtime falls back to the generic media box.

- `@param` {string[]} imageUrls absolute share-image URLs
- `@param` {string[]} videoUrls absolute share-video URLs
- `@param` {Set<string>|null} manifest bucket key set for poster resolution
- `@param` {string} cdnBase CDN base URL the keys resolve against
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@returns` {Promise<Map<string, number[]>>} capture URL → [w, h]

### `shareManifestDoc`

The runtime share manifest payload — emitted to the set's
`MANIFEST_URL` under `website/public/meta/` so the SPA can rotate
og:image through the whole set without knowing the bucket listing.
`videos` lists any recorded engine clips under the same prefix — the
runtime reads `images` today, the extra key is additive for the
sitemap/video-entity consumers. `dims` maps each capture URL to its
probed intrinsic [w, h] — the sitemap's media wall packs cards at the
real aspect instead of the generic fallback box.

- `@param` {string[]} urls absolute share-image URLs
- `@param` {string} cdnBase CDN base URL
- `@param` {object} [share] share-set token map (EARTH_SHARE default)
- `@param` {string[]} [videoUrls] absolute share-video URLs
- `@param` {Map<string, number[]>} [dims] probed capture dims (URL → [w,h])
- `@returns` {object} serializable manifest document

### `shuffled`

Fisher–Yates copy — a fresh permutation per build so consecutive
emitted pages draw different share images while every capture stays in
the rotation. The input array is never mutated.

- `@param` {Array} arr source array
- `@returns` {Array} shuffled copy
