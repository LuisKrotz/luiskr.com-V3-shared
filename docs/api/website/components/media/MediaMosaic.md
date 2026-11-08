# `website\components\media\MediaMosaic.tsx`

&lt;media-mosaic&gt; — the internals natural-size masonry wall:

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\MediaMosaic.tsx`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MediaMosaic`

<media-mosaic> element — packs project-section media at natural sizes.
Exposes the same configure({items, folder, forceActive}) contract as
<custom-carousel> so the project binder treats both tags identically;
forceActive only forwards to the embedded carousel on the ≤1024px path.

### `_items`

Media rows pushed by the view (intrinsic `size` drives the pack).

### `_folder`

CDN folder prefix prepended to each item's src.

### `_forceActive`

Passthrough for the embedded carousel's forced-active flag.

### `_isCompact`

≤1024px viewport flag — swaps the wall for <custom-carousel>.

### `_packedW`

Width the current tiles were packed at — repack trigger on change.

### `_lastObservedW`

Last host width the ResizeObserver reported (sub-pixel dedup).

### `_mq`

The ≤1024px media query — null where matchMedia is unavailable.

### `_ro`

Host ResizeObserver driving repacks on width changes.

### `_rafId`

Pending layout RAF for debounced re-packs.

### `tiles`

Computed per-tile style objects from the skyline pack.

### `wallH`

Packed wall height → container style.

### `items`

Slide data getter — parity with the carousel's items contract.

### `configure`

Batch-assigns items/folder/forceActive with a single render — mirrors
<custom-carousel>.configure so the project binder configures both
tags through one code path. Same array + same flags is a no-op.

- `@param` {object} o
- `@param` {Array} o.items Media descriptors (intrinsic `size` drives the pack).
- `@param` {string} o.folder CDN folder prefix.
- `@param` {boolean} o.forceActive Forwarded to the ≤1024px carousel only.

### `items`

Setter/getter — media rows (new data repacks at the next pass).

### `folder`

CDN media folder prefix.

### (module scope)

Lifecycle: binds the breakpoint query + host ResizeObserver.

### (module scope)

Lifecycle: releases the pending RAF + observer.

### (module scope)

Post-render pass: on the compact path the freshly rendered carousel
gets the same configure payload the binder would send; on the wall
path a relayout repacks if the measured width moved (applyTileStyles
re-stamps inline styles on rebuilt DOM).

### `relayout`

Immediate repack — measure → pack → apply (see mosaic/layout.ts).

### `scheduleLayout`

Debounced repack (resize/data changes).

### `_syncCarousel`

Pushes the binder's payload into the embedded <custom-carousel> —
forceActive forwards verbatim so the mobile strip behaves exactly
like a view-rendered one (>2 items or all-landscape keeps the track).

### (module scope)

JSX template — see mosaic/render.tsx (wall vs compact carousel).
