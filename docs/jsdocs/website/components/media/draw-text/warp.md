# `website/components/media/draw-text/warp.ts`

| | |
|---|---|
| **Source** | `src/website/components/media/draw-text/warp.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Warp tunables — fractions of the title's own geometry, so the same
numbers work from 13px menu labels to 90px display titles.

### `_LIFT_RATIO`

Peak upward lift, fraction of char height.

### `_SCALE_GAIN`

Peak scale gain at the cursor point.

### `_SKEW_DEG`

Peak skew away from the pointer, degrees.

### (module scope)

Cached geometry for one warp session (pointerenter → pointerleave).

### `chars`

Char spans currently mounted in the shadow root.

### `centers`

Viewport-space center of each char, measured once on entry.

### `sigma2`

Influence radius in px — derived from the host's height.

### `charH`

Representative char height in px — scales the lift amount.

### `raf`

Pending rAF handle so only one frame of writes is queued.

### `px`

Last pointer position — consumed by the rAF callback.

### `applyWarp`

Applies the warp displacement for the pointer position stored on the
session. For each char the influence is a gaussian of the 2D distance
to the pointer; transform is translateY + scale + a skew that pushes
the char slightly away from the cursor horizontally.

### `teardownWarp`

Tears down listeners/session state — called on disconnect & warp-off.

### `setupWarp`

Arms the liquid warp: chars are re-measured on every pointerenter so
scroll/reflow never desyncs the centers, then pointermove just writes
transforms inside one rAF per frame. The warp only runs after the
reveal finished (`.draw-text--done`) — while chars are animating the
CSS keyframes own their transforms.

### `detachWarp`

Detaches the three pointer listeners — disconnect path.
