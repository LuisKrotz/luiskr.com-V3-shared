# `core\utils\media.ts`

Media-URL builders — the single place where CDN filename

| | |
|---|---|
| **Source** | `src/core\utils\media.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

A media entry's URL-relevant fields as stored in the DB: `src` is the
extensionless stem the CDN grammar appends suffixes to, and `isVideo`
selects between the image and video suffix sets.

### (module scope)

Resolved media URL triple — the full-quality `source`, the progressive
`thumb` (mozjpeg small variant or video poster frame), and the `isVideo`
discriminator echoed back so consumers don't re-inspect the item.

### `isGravatarUrl`

Checks if a given URL belongs to gravatar.com (exact host or any
subdomain like `secure.gravatar.com`). Non-Gravatar URLs must not get
`size=` rewrites — that param is Gravatar-specific. `new URL` throws on
malformed input and relative URLs without a base — the try/catch maps
both to `false` (not-Gravatar) since either case is unrewritable anyway.
- `@param` urlStr Candidate URL (absolute or relative).
- `@returns` Whether the host is gravatar.com or a subdomain.

### `getGravatarSrcset`

Builds responsive Gravatar srcset with 1x, 2x, 3x density descriptors —
200/300/400 px variants chosen by GRAVATAR_SIZE_*. Any existing `size=`
param is stripped first so the rewrite is idempotent; `sep` picks `?` or
`&` depending on whether other query params remain (stripping `size=`
may have consumed the `?`).
- `@param` urlStr Gravatar URL to expand.
- `@returns` srcset string, or '' for non-Gravatar input.

### `getOptimizedGravatar`

Replaces the `size=` parameter on a Gravatar URL. Non-Gravatar URLs pass
through unchanged (the param is meaningless off-domain), and a URL with
no `size=` is left alone since the regex finds no match.
- `@param` urlStr Candidate Gravatar URL.
- `@param` size Pixel edge to request (default 300 — the rendered avatar box).
- `@returns` Rewritten URL, original URL, or '' for non-string input.

### `encodeMediaUrl`

Percent-encodes a media URL for attribute/markup emission — bucket keys
can carry literal spaces ('brazilian leather/…', '…PARIS FASHION-WEEK…')
and non-ASCII ('garçonne'), which the bucket serves fine but which break
<source srcset> candidates (its grammar splits on whitespace) and
RFC-3986-strict contexts (sitemap locs, JSON-LD image/contentUrl).
Idempotent: already-encoded input decodes first, so a %20 never
becomes %2520 (encodeURI escapes '%' itself). Malformed escapes make
decodeURI throw — the catch emits the input with bare '%' → %25.
- `@param` url Raw or encoded media URL (may contain spaces/non-ASCII).
- `@returns` The emission-safe URL ('' stays '').

### `webpSibling`

Derives the .webp sibling of a .jpg URL — the compressed-variant naming
convention replaces only the extension, so the webp sits beside the
original at the same path ("if webp exists" is decided by the request,
no manifest lookup). Returns '' for non-.jpg input so callers can
conditionally render a <source>.
- `@param` url JPG media URL.
- `@returns` The same URL with .webp instead of .jpg, or '' when not .jpg.

### `webmSibling`

Derives the .webm sibling of an .mp4 URL — same convention as
webpSibling: `x.mp4` → `x.webm` and `x.mp4-scaledown-2x.mp4` →
`x.mp4-scaledown-2x.webm`. Returns '' for non-.mp4 input.
- `@param` url MP4 media URL.
- `@returns` The same URL with .webm instead of .mp4, or '' when not .mp4.

### `coverLadderStep`

`load` step on a progressive cover's high layer — the ladder walker.
Records the painted URL in the host registry (re-renders rebuild the
shadow DOM wholesale via replaceChildren, so the registry is what
re-emits the reached tier instead of replaying from the LQIP) and
publishes the loaded class driving the CSS crossfade. When rungs
remain above the painted one it preloads the next tier through a
detached Image — the probe request doubles as the webp decode check —
and swaps `src` only once bytes confirm, so a painted rung can never
tear. The swap re-fires the img's own `load`, re-entering this step
until the highest proven tier is reached.
- `@param` registry Host map of cover key → highest confirmed painted URL
- `@param` coverKey Stable identity of the cover (the original URL).
- `@param` img The high-layer img that fired `load` (event currentTarget).
- `@param` rungs Ascending proven tiers from coverVariants — last is top.
- `@param` loadedClass Class token that turns the layer's opacity on.

### `advance`

Publishes a confirmed tier — the emitted rung-0 <source> has served
 by now, so its <source> nodes go and img.src becomes authoritative;
 the resulting `load` re-enters this step to climb the next rung.

### `buildMediaUrls`

Constructs media URLs for images and videos following the project's
compression pipeline. URL grammar:
  image source : storage + folder + src + '-mozjpg-uncompressed.jpg'   (full quality)
  image thumb  : storage + folder + src + '-mozjpg3-MSSIM-tuned-kodak.jpg' (blur-up)
  video source : storage + folder + src + '.mp4'
  video thumb  : storage + folder + src + '.mp4.jpg-thumb.jpg'         (poster frame)
`src` in the DB never carries an extension — the pipeline's suffix is
appended here, which is why an unsuffixed URL 404s.
- `@param` storage - Base storage URL (store.getters.getStorage())
- `@param` folder - Project folder prefix, e.g. 'aboutmarco/'
- `@param` item - Media item descriptor `{ src, isVideo }`
