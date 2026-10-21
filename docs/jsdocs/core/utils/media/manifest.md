# `core/utils/media/manifest.ts`

Runtime knowledge of which CDN objects exist, backed by the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/utils/media/manifest.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `keys`

Parsed bucket key set — null until (or unless) the manifest fetch lands.

### `pending`

In-flight fetch dedupe — multiple boot callers share one request.

### `initMediaManifest`

Fetches the bucket key manifest once; resolves immediately on repeat
calls. Fire-and-forget at boot — renders that happen before it lands
simply emit no <source>, which is the safe path.

### `mediaManifestReady`

Whether the manifest has arrived. Lets the media-figure probe distinguish
"unknown — try webp" from "known-absent — skip straight to the original".

### `mediaKeyExists`

Whether the manifest lists the CDN object behind `url`. Absolute URLs
get the CDN_BASE prefix stripped to their bucket key; non-CDN URLs
(gravatars, data URIs) always report false — they have no siblings.

- `@param` url Full media URL or a raw bucket key.

### `webpIfExists`

webp sibling of a .jpg URL when the manifest confirms it was generated,
'' otherwise — safe srcset input for a <source>: empty means "no source".

- `@param` url Original .jpg media URL.

### `webmIfExists`

webm sibling of an .mp4 URL when it exists in the manifest, '' otherwise.
`<video><source>` DOES retry the next source on network failure, so this
gate is belt-and-suspenders for saving a doomed request, not correctness.

- `@param` url Original .mp4 media URL.

### (module scope)

Manifest-gated cover URL matrix — see coverVariants().

### `src`

URL for <img src> — full-res mozjpeg when proven, else the original.

### `webp`

webp matching `src`, '' when not proven.

### `mobileJpg`

≤768px jpg for a media-scoped <source>, '' when not proven.

### `mobileWebp`

≤768px webp — preferred over mobileJpg when both exist.

### `coverVariants`

Resolves the responsive cover matrix for one `covers/<stem>.jpg` URL:
the mozjpeg full-res derivative (same pixels, ~70% fewer bytes) plus
its 768px mobile tier and webp siblings — each gated on
`mediaKeyExists` so an unproven object can never become the card's
only image. A missing/never-loaded manifest yields the original URL
with its own webp probe — exactly today's behavior.

- `@param` coverJpg Emission-encoded covers/*.jpg URL (original).
- `@returns` Bound URLs for picture/img — empty strings mean "omit".
