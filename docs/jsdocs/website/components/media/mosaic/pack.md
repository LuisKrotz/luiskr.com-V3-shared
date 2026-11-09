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

Pocket shrink-fit: a segment narrower than the tile still gets a
candidate — the tile downscales (aspect kept) to the segment's width
and rests at that segment's own height. Without it a leftover pocket
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
