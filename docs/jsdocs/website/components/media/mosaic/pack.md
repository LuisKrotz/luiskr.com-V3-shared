# `website\components\media\mosaic\pack.ts`

Natural-size masonry packing engine for &lt;media-mosaic&gt;.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\mosaic\pack.ts`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One level segment of the skyline: y is the occupied height over [x, x+w).

### (module scope)

One placed tile box in wall coordinates — mutated by the void fill.
`ow`/`oh` hold the packed size so the fill's grow cap applies to the
total factor, never to a compounding series of single-void grows.

### (module scope)

Packed wall result — per-tile style objects plus the wall height (px).

### `sizeAt`

Scales [natW, natH] down by `divisor` preserving aspect, then clamps the
width to the wall. Width is floored (never rounds past the bound), height
rounded — both stay integer CSS px.

- `@param` natW Intrinsic media width.
- `@param` natH Intrinsic media height.
- `@param` divisor Scale divisor (3, 4, 2, or 1).
- `@param` wallW Wall content width in px.
- `@returns` Rounded {w,h} tile box.

### `mosaicTileSize`

The tile box for one media item inside a `wallW`-wide wall. Ladder:
÷3 for quality (display < source), ÷4 when ÷3 still overflows the wall,
fit-to-wall beyond that; then the expand-trigger floor — ÷2 or undivided
when the scaled tile would be too small for the modal-open button.
Missing intrinsic sizes fall back to the generic media box.

- `@param` natW Intrinsic width (≤0 → generic fallback).
- `@param` natH Intrinsic height (≤0 → generic fallback).
- `@param` wallW Wall content width in px (≤0 → generic fallback).
- `@returns` The rendered tile size in CSS px.

### `tileStyle`

Style object for one placed tile — absolute box at (x,y) sized w×h;
overflow hidden keeps the figure's radius/shadow inside the tile.

- `@param` x Placement x (px).
- `@param` y Placement y (px).
- `@param` w Tile width (px).
- `@param` h Tile height (px).
- `@returns` The tile style object.

### `skylineTop`

Occupied height across [x, x+w) — the tallest skyline segment the span
touches; the tile rests on that peak.

- `@param` segs Ordered skyline segments covering [0, wallW).
- `@param` x Span start.
- `@param` w Span width.
- `@returns` The peak y under the span.

### `raiseSkyline`

Raises the skyline to `y` over [x, x+w) — splits covered segments,
preserves uncovered margins, then merges adjacent equal-height spans so
the segment list stays small (O(segs) per placement).

- `@param` segs Ordered skyline segments covering [0, wallW).
- `@param` x Footprint start.
- `@param` w Footprint width.
- `@param` y New height for the covered span.
- `@returns` The updated ordered segment list.

### `bestSpot`

One tile's lowest legal spot on the current skyline: candidates are
every segment start. Lowest top wins; ties take the leftmost
candidate. (Right-aligned ends were considered and dropped: inside
its own segment a right-align always ties seg.x and loses on
leftmost, and landing inside an earlier segment its span covers a
superset of that segment's tail — it can never produce a strictly
lower top, so the set was dead candidates.) Tiles clamp to ≤ wallW
and the x=0 segment always exists, so a candidate always lands.

The resting top is measured over the tile's whole FOOTPRINT — box
plus the trailing GAP strip the raise will reserve — not just the
box span. That single rule is what keeps the wall honest:
margins — a placed tile flush on the candidate's right edge lifts
the strip's level, so the candidate rests BELOW the neighbour's
bottom+GAP (vertical separation) instead of painting a 0px seam
where the boxes' y-ranges overlap;
monotonic skyline — the resting top is the MAX over the exact span
the raise covers, so a raise can never stamp a covered segment
lower (a pocket's GAP strip used to overwrite a taller
neighbour's edge level downward, and later tiles — shrink-fits
trusting the corrupted segment — landed INSIDE the neighbour's
box). With a monotone profile, level(x) always equals the deepest
footprint bottom covering x.
Left-side margins need no check: a tile ending left of a candidate
already raised its own GAP strip, which sits inside the candidate's
span and forces the same vertical separation.

Pocket shrink-fit: a segment narrower than the tile still gets a
candidate — the tile downscales (aspect kept) to the segment's width
and rests on the deepest footprint top. Without it a leftover pocket
smaller than every remaining tile stays a permanent void (the "big
white gap" bug): e.g. a 582px pocket at top 2139 while 640-wide
leftovers keep stacking on the opposing 2454 column. The shrunk
candidate only wins when its pocket is strictly deeper than the best
full-size top — on a tie the bigger box always takes it — and the
pocket must still honor the tile floors: the segment must reach
max(MIN_TILE_W, half the packed width — the DIVISOR_SMALL rung
bound) so a tile never renders as a sliver below half its intended
size, and the scaled height must reach MIN_TILE_H — thin gaps stay
honest gutters instead of collecting squished tiles.

- `@param` segs Ordered skyline segments covering [0, wallW).
- `@param` s Tile box {w,h} (the packed size, before any pocket shrink).
- `@param` wallW Wall content width in px.
- `@returns` The best {x,y,w,h} for that tile — w/h differ from s.w/s.h

### `slabVoids`

Free vertical spans inside one x-slab — the uncovered intervals
between (or below) the tiles overlapping [x0, x1). Slab boundaries
are tile edges, so coverage is uniform across the slab width: a tile
either spans the whole slab or misses it entirely.

- `@param` placed Placed tile boxes.
- `@param` x0 Slab left edge.
- `@param` x1 Slab right edge.
- `@param` height Packed wall height — below it the slab is free to the
- `@returns` Free {top,bottom} intervals, shallowest first.

### `floorBelow`

First covered top below tile `t` across the grown span — the floor the
grown box must not cross. The span is the grown box's sub-GAP shadow:
a tile ending inside it or closer than one GAP to either edge could
paint a sub-16px seam against the grown box once the grown height
dips below that neighbour's top, so their tops bound the grow too —
while a neighbour already a full GAP away needs no bound. Tiles at or
above t's own top can't bound downward growth (the placement
invariant keeps their bottoms above the grown band); nothing below
means the wall's ragged bottom, which is free space.

- `@param` placed Placed tile boxes.
- `@param` t The candidate tile.
- `@param` x0 Grown span left edge.
- `@param` x1 Grown span right edge.
- `@param` height Packed wall height — the default floor.
- `@returns` The bounding floor y for the grown box.

### `fillVoid`

Grows one void's left wall tile rightward into the void — the wall's
left bound always coincides with a tile's right edge (slab boundaries
are tile edges), so the fillable direction is always left-to-right: if
that edge tile sits inside the void band it can grow; if the region
left of the void is free at that band it is the same void continuing
into the next slab, which its own left wall already fills. The aspect
factor applies to height too, so the media never distorts (the figure
fills the tile box, so the grown box only costs display density:
FILL_GROW_MAX keeps it denser than the ÷2 rung the ladder paints). A
candidate must sit wholly inside the void band (its top at or below
the void's top): growing paints the tile's whole height into the new
columns, so a tile that reaches above the void would cover whatever
sits there. The grow stops GAP short of any tile that could meet the
grown box's top or right edge within the inter-tile rhythm —
straddlers and ceiling-adjacent tiles bound the grown right edge,
while the floor under the grown span (its whole GAP-shadow, so
near-adjacent neighbours count too) is discounted one GAP so the
grown bottom never lands closer than GAP above a tile below. The
bounding tests measure the GROWN band, not the void's own: the grown
box can dip below v.bottom, so a right-wall or covering tile bounds
the grow wherever its y-range can meet the grown box's reach — and
the ragged wall bottom stays reachable, since free space needs no
margin. Returns true when a tile actually grew ≥1px.

- `@param` placed Placed tile boxes (mutated on success).
- `@param` x0 Void slab left edge.
- `@param` x1 Void slab right edge.
- `@param` v The free vertical interval inside the slab.
- `@param` height Packed wall height.
- `@returns` Whether a tile grew.

### `fillMosaicVoids`

Post-pack void fill — the skyline can strand dead regions no pending
tile could legally enter: canyons between a high tile and its support,
a right-edge strip when the rightmost ladder box lands short, and deep
pockets wider than every leftover. Those read as broken margins. The
wall is partitioned into x-slabs at tile edges; inside each slab the
free vertical spans are refilled by growing the tiles that wall them,
aspect kept, until no significant void remains. Growth only ever
enlarges a box into free space — no tile moves, shrinks, or overlaps.

- `@param` placed Placed tile boxes (mutated).
- `@param` wallW Wall content width in px.
- `@param` height Packed wall height.

### `packMediaMosaic`

Full packing pass: each step evaluates every remaining tile's lowest
legal spot and places the one whose top is the global minimum — ties
resolve to the earliest in document order, so the wall reads
left-to-right like the carousel it replaces while a narrow tile can
still slip into a pocket a wider predecessor would have sealed over
(a placed footprint's whole span rises to its top, erasing any lower
pocket it covers — picking the deepest _fit_ each step is what keeps
those shelf holes from stranding as visible gaps). Footprints carry
the GAP on the right and bottom (clamped at the wall edge).

- `@param` items Media items (intrinsic sizes via item.size).
- `@param` wallW Wall content width in px.
- `@returns` {tiles, height} or null for empty/degenerate input.

### `estimateMosaicHeight`

Pre-render height estimate — the packed wall height at a predicted
width (the view's section wrapper publishes it as --media-mosaic-height
so a deferred mosaic reserves its final box). 0 when unpacking.

- `@param` items Media items.
- `@param` wallW Predicted wall width in px.
- `@returns` Estimated wall height in px.
