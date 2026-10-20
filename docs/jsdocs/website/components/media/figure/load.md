# `website/components/media/figure/load.ts`

Media URL matrix + progressive loading for &lt;media-figure&gt;:

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/media/figure/load.ts`           |
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

Thumb → high-res swap. A detached Image preloads the Q50 variant —
webp first, jpg on 404 (the "if webp exists" check is the request
itself, no manifest round-trip); on load the visible element swaps src

- gets the loaded class (the CSS crossfade) and the thumb hides. The
  4096²-pixel budget gates the GPU texture upload only — oversized
  sources still fetch and decode (the browser owns that memory), so a
  big file can never pin its card on the blurred thumb.
  Errors mark loaded anyway — a broken image must not pin the skeleton
  shimmer forever.
