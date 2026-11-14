# `core\utils\media\group.ts`

Media-group shape predicates shared by the project view and

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\media\group.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Loose media-item shape — both the view's ProjectMediaItem and the
carousel's CarouselItem satisfy it.

### `mediaItemHeightRatio`

Height ratio (h/w) of one media item — the rendered height the media
would take at a common width, which is exactly the axis a uniform
carousel strip flattens. Null when the item carries no usable intrinsic
size (unsized rows are excluded from the spread decision rather than
guessed — a row that can't prove variation keeps the carousel).

- `@param` item One media descriptor.
- `@returns` h ÷ w, or null for missing/degenerate sizes.

### `isAllLandscapeGroup`

Whether every item in the group is flagged landscape — all-landscape
groups can't pair side-by-side in the two-up carousel layout, so they
force the scroll track (the `forceActive` contract shared by the
project binder and the mosaic's mobile carousel fallback).

- `@param` group A media item array (shape-checked, not trusted).
- `@returns` true when every item is landscape and the group is non-empty.

### `HERO_SLOT_CLASSES`

Hero-slot class tokens — `internal-main-item` and `ztf-video` are
view-stamped contracts for the project cover only.

### `stripHeroSlotClasses`

The CMS `class` list minus the hero-slot tokens. A slide or mosaic tile
built from the cover media inherits the item's raw class string
unchanged — forwarded onto its <media-figure>, `internal-main-item` /
`ztf-video` re-trigger the 0,3,0 hero selectors (they outrank every
slide rule, inflating the laddered box to the 70dvh/175dvh hero caps —
the blown-out landscape slide bug). The slide WRAPPER keeps the full
class list for context/variant selectors; only the figure is scrubbed.

- `@param` itemClass The item's raw CMS class string.
- `@returns` The class string safe to forward onto a slide/tile figure.

### `hasIrregularMediaHeights`

Irregular-heights detector: reports "mosaic" on the spread signal —
(a) any sized item whose natural height exceeds TALL_ITEM_H disqualifies
the whole group (a >2560px source never renders in the natural-height
wall — the group stays on the capped carousel strip), or (b) a
max/min h/w spread of
INTERNAL_MOSAIC.RATIO_SPREAD_MIN across the group's sized items — e.g.
half 16:9 + half 9:16 (≈3.16×), or very-wide shots next to squares
(≈2.3×), or (c) a max/min natural pixel-area spread of
INTERNAL_MOSAIC.AREA_SPREAD_MIN — same-aspect sources at very different
resolutions (997×720 beside 1980×1108 ≈3.06×) that a uniform strip
would flatten. Unsized items are skipped; spread needs two sized items to
prove variation while the tall-item signal stands alone.

- `@param` items A media item array (shape-checked, not trusted).
- `@returns` true when the group should render as the masonry wall.
