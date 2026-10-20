# `website/components/home/HomeMosaic.tsx`

&lt;home-mosaic&gt; — the masonry project grid on the home page:

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/home/HomeMosaic.tsx`            |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `HomeMosaic`

The HomeMosaic — mosaic class.

### `processedItems`

Setter/getter — layout-ready project items pushed by the view.

### `translations`

Setter/getter — locale strings for card labels.

### `hasTouch`

Whether the session is touch-input (disables hover previews).

### `storage`

CDN base URL for card media.

### `_packSkeleton`

Packs skeleton tiles with the same lowest-column algorithm as
quickLayout(), using the real featured pattern (first
SKELETON_MOSAIC.MOSAIC_FEATURED tiles span 2 columns) so the placeholder wall
matches the loaded geometry instead of a uniform grid — avoids a
jarring layout shift when real data lands. Returns {boxes, height}.

### `skeletonH`

Height of the skeleton placeholder area.

### `scheduleLayout`

Debounced re-layout (resize/data changes).

### `quickLayout`

Synchronous layout pass for urgent repaints (data arrival, resize,
hover expansion). Same packing math as layout() but skips the WASM
round-trip so the DOM never waits on a worker.

### `layout`

Full masonry pass: measures, assigns columns, positions cards via WASM math.

### `_applyCardStyles`

Writes computed card positions/sizes into DOM styles.

### `onHover`

Pointer-enter: expands the card's details region — see
mosaic-interactions.ts for the two-pass measurement flow.

### `onLeave`

Pointer-leave: clears hover state.

### `onClick`

Card activation — see mosaic-interactions.ts for the desktop-nav /
two-tap-on-touch split.

### `skeletonStyle`

Style object for one skeleton placeholder box.

### (module scope)

JSX template for the component's shadow DOM.

### `_syncAnimDescs`

Binds the mosaic-tile description to every card — each tile's
hover/press/displacement spring is the animated surface. Runs
post-render so the shared desc node lands in the shadow root
(detached-node application would mint duplicate ids).

### `_syncRingSheen`

Keeps the instanced ring-sheen overlay bound to the live
`.home-mosaic` wall — renders recreate the container, so a session
on a detached node is torn down and remounted; a live one just
gets a dirty-mark (the layout pass may have moved tiles).

### `_syncBrackets`

Mounts the corner-brackets WebGPU widget on each card CTA —
re-queries every update so a repacked/re-rendered card wall drops
stale mounts. The CTA is a span inside the card link; its own
:hover drives the ramp (matching _cta.scss).
