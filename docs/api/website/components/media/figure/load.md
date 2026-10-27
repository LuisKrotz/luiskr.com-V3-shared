# `website\components\media\figure\load.ts`

Media URL matrix + progressive loading for &lt;media-figure&gt;:

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\figure\load.ts`           |
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

### `warmFirstRung`

CDN warm ordering — fires a detached fetch of the FIRST ladder rung
while the figure is still ~600px outside the viewport. The request
itself warms the CDN edge and the browser HTTP cache (decodeImageWASM
replays it via `force-cache`), so the 100px-margin climb starts on a
hot rung instead of a cold one. Warms only the entry rung — the climb
ascends serially, so warming the top rung early would fight the low
rung's fetch for bandwidth and warm a resource that may never publish.
Never publishes, never marks loaded — pure network warm.

### `ladderBoxWidth`

The figure's rendered box width for stem/ladder picks — read once and
memoized. clientWidth is a synchronous layout query: with ~100 figures
on a media page, one read per warm AND per climb re-entrant during the
mount/publish storms stacks into the forced-reflow budget Lighthouse
attributes to this callsite. A stale-after-resize value only shifts
which quality tier loads — never correctness — so the cached read is
the right trade.

- `@param` fig The mounted figure.
- `@returns` Rendered CSS-pixel width (0 before first layout).

### `figureLadder`

The ascending rung ladder a figure climbs — the 768px-wide
`{stem}-mobile` derivative stem when the rendered box is ≤768 CSS px
and the manifest proves mobile tiers exist, else the full-width stem.
Every mobile rung is a fraction of its full-width twin's bytes and a
box that small cannot resolve the difference — Lighthouse counts the
full-width climb as pure waste.

- `@param` stem Emission-encoded extensionless media stem.
- `@param` boxWidthCssPx Rendered figure width (0 = pre-layout → full stem).
- `@returns` Proven ascending rungs — may be empty (manifest absent).

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

### `publishDom`

Publishes a confirmed tier into the visible high layer — the probe
already holds the bytes. The tier mounts as a NEW img stacked over
the painted one (reassigning the live img.src would blank the box
while the upgrade re-decodes — the rung blink); the clone mounts
empty, paints once its own `load` fires, and retires every layer
underneath in the same task, so the swap is atomic per frame.
Re-queries the topmost layer each rung because _updateDom rebuilds
the shadow DOM wholesale between steps.

### `retired`

Retires every layer UNDER the successor once it is fully
painted AND fully opaque — never at load. Removing mid-fade
(or before first paint) leaves a translucent rung over an
empty figure box for the transition's remainder: the visible
quality-swap blink. transitionend fires at fade completion;
the timeout covers reduced-motion/no-transition environments
where the event never lands. Index order is recomputed at
retire time so a newer layer mounted above is never pruned.

### `publish`

Scroll-gesture park for the DOM swap — clone/insert/transition churn
mid-fling spends the frame budget the scroll itself needs (scroll-fps
gate floors: 120fps mobile / 240fps desktop). Probes keep fetching and
decoding off the gesture path; only the visible layer swap waits for
scroll-idle, and the painted thumb already owns the box so nothing
blanks. onScrollStop fires immediately when the window isn't
scrolling, so a static viewport sees no added latency. Parked calls
fire in registration order — the climb confirms rungs serially, so
the LAST publish is always the highest proven tier.

- `@param` url Confirmed rung URL ready to paint.

### `climb`

Probes rung `i` through a detached Image; on confirm the tier paints
and the climb continues, stopping when the highest proven quality is
reached. A proven-but-dead webp retries once as jpg; a dead jpg just
skips to the next rung — the best confirmed tier stays painted.
