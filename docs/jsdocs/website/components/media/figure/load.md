# `website\components\media\figure\load.ts`

Media URL matrix + progressive loading for &lt;media-figure&gt;:

| | |
|---|---|
| **Source** | `src/website\components\media\figure\load.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `resolveMediaSources`

Builds the media's CDN URL matrix on init: [poster, webm, mp4] per tier
for videos (full size + VIDEO_SCALE'd fallback — the browser walks the
<source> list until one resolves, so webm-first means "use webm when it
exists, mp4 otherwise"), or the thumb URL for images.

### `mediaPlaceholder`

Inline SVG placeholder — a URL-encoded empty <svg> carrying the media's
real width/height (definite intrinsic size) plus the viewBox aspect.
The width/height attrs matter: a viewBox-only SVG is intrinsic-ratio-only
and the <img> would collapse to the ~300×150 default replaced size under
`width:auto`, so carousel placeholders keep their natural box before any
bytes arrive (zero-CLS without shipping a real image).

### (module scope)

Thumb → high-res quality ladder. Detached Image probes climb the
manifest-proven rungs (q50 → q75 → raw original → uncompressed) — webp
first, jpg on 404 (the "if webp exists" check is the request itself, no
manifest round-trip); every confirmed tier republishes the same high
layer's src, so the painted box upgrades in place and can never tear.
The 4096²-pixel budget gates the GPU texture upload only — oversized
sources still fetch and decode (the browser owns that memory), so a
big file can never pin its card on the blurred thumb.
Errors mark loaded anyway — a broken image must not pin the skeleton
shimmer forever.

### `best`

Highest confirmed probe — the bitmap handed to the GPU at chain end.

### `publish`

Publishes a confirmed tier into the visible high layer — the probe
already holds the bytes. The tier mounts as a NEW img stacked over
the painted one (reassigning the live img.src would blank the box
while the upgrade re-decodes — the rung blink); the clone mounts
empty, paints once its own `load` fires, and retires every layer
underneath in the same task, so the swap is atomic per frame.
Re-queries the topmost layer each rung because _updateDom rebuilds
the shadow DOM wholesale between steps.

### `climb`

Probes rung `i` through a detached Image; on confirm the tier paints
and the climb continues, stopping when the highest proven quality is
reached. A proven-but-dead webp retries once as jpg; a dead jpg just
skips to the next rung — the best confirmed tier stays painted.
