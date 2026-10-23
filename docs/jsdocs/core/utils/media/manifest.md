# `core\utils\media\manifest.ts`

Runtime knowledge of which CDN objects exist, backed by the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\media\manifest.ts`                        |
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

One proven rung on a progressive-cover quality ladder — the jpg URL
plus its webp sibling ('' when the manifest can't prove it).

### `jpg`

Proven .jpg variant URL for the tier.

### `webp`

Proven .webp sibling, '' when the manifest can't prove it.

### (module scope)

Manifest-gated cover URL matrix — see coverVariants().

### `src`

URL for the LQIP <img src> — kodak blur thumb when proven, else the original.

### `webp`

webp matching `src`, '' when not proven.

### `mobileJpg`

≤768px LQIP jpg for a media-scoped <source>, '' when not proven.

### `mobileWebp`

≤768px LQIP webp — preferred over mobileJpg when both exist.

### `rungs`

Ascending display-quality rungs the high layer climbs (coverLadderStep
walks them, highest proven quality last) — empty when no LQIP
exists, since `src` is then already the original.

### `mobileRungs`

Ascending rungs on the 768px `{stem}-mobile` derivative ladder —
the correct climb for boxes ≤768 CSS px (the same stem grammar, so
every rung is a fraction of its full-width twin's bytes). Empty when
the manifest proves no mobile tier.

### `LADDER_SUFFIXES`

Ascending quality-tier suffixes for a cover ladder — q50 → q75 → the
raw original → uncompressed, mirroring the build-time IMAGE_VARIANTS
quality order in shared/scripts/build/media-manifest.mjs (uncompressed
pass preferred, then raw original). The '' entry is the original URL.

### `coverRungs`

Builds the ascending upgrade ladder for one `covers/<stem>.jpg` URL —
every derivative rung is `mediaKeyExists`-proven so a swapped-in src
can never 404; the original row ('' suffix) is always trusted because
it IS the URL the database points at. Non-.jpg input keeps its stem
whole and resolves to just the passthrough original rung.

- `@param` stemJpg Emission-encoded media URL ending in .jpg (original).
- `@returns` Ascending rungs — lowest quality first, highest last.

### `mediaRungs`

Fully manifest-gated quality ladder for an extensionless media stem
(`folder/pic` — the figure/video grammar where derived files are
`stem-mozjpg-<quality>.jpg`). Unlike coverRungs even the raw
`{stem}.jpg` is proven by mediaKeyExists — the pipeline emits only
suffixed tiers, so an untrusted passthrough could 404. Returns [] when
the manifest is absent or proves nothing; callers then fall back to
the historic "the request IS the check" probe.

- `@param` stem Emission-encoded media URL without an extension.
- `@returns` Ascending proven rungs — lowest quality first, highest last.

### `coverVariants`

Resolves the progressive cover matrix for one `covers/<stem>.jpg` URL:
the kodak LQIP blur-up (plus its 768px mobile tier and webp siblings)
as the first paint, and `rungs` as the ascending quality ladder the
high layer climbs once bytes confirm — q50 → q75 → original →
uncompressed, highest proven tier last. Every variant is gated on
`mediaKeyExists` so an unproven object can never become a card's only
image; a missing/never-loaded manifest yields the original URL with
its own webp probe and no ladder (`rungs` stays empty).

- `@param` coverJpg Emission-encoded covers/*.jpg URL (original).
- `@returns` Bound URLs for picture/img — empty strings mean "omit".
