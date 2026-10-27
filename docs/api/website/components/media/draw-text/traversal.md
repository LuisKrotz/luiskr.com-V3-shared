# `website\components\media\draw-text\traversal.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\draw-text\traversal.ts`   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `x0`

First atlas column of the cell (inclusive).

### `x1`

First atlas column AFTER the cell (exclusive).

### `INK_ALPHA_MIN`

Alpha floor for "this pixel is ink" — antialiased fringes below this are paper.

### `COST_STRAIGHT`

Straight neighbour cost — the unit step of the geodesic flood.

### `COST_DIAG`

Diagonal neighbour cost — 3/2 ≈ √2, keeps the flood isotropic.

### `RING_SIZE`

Dial ring size — buckets are indexed `dist % (maxCost + 1)`.

### `PATH_LEN_SCALE`

Canonical stroke path length as a multiple of cell height (see file doc).

### `FIELD_BYTE_MAX`

Field byte resolution — T is stored in one RGBA channel.

### `RGBA_STRIDE`

Bytes per RGBA pixel in the ImageData buffer.

### `ALPHA_BYTE`

Byte offset of the alpha channel inside one RGBA pixel.

### `NEIGHBOURS`

8-neighbourhood: [dx, dy, cost] — straight steps then diagonals.

### `bakeTraversalField`

`bakeTraversalField` — floods each cell's ink from its pen-entry point
and writes the normalized visit order into the atlas' R channel, in
place. Pixels the flood cannot reach keep their painted R=255 so they
write last (pen lift) or never (paper — alpha masks them out anyway).

The bucket queue is a bounded drain loop, not stack emulation: each
pixel is enqueued at most once per relaxation and dist strictly
decreases per re-push, so the ring always empties.

- `@param` data RGBA bytes of the painted atlas (`ctx.getImageData().data`).
- `@param` width Atlas width in px.
- `@param` height Atlas height in px (the atlas is a single row of cells).
- `@param` cells Per-glyph x-ranges, in atlas order.

### `relax`

Relaxes the 8-neighbourhood of one popped pixel — a straight step
costs 2, a diagonal 3, and a neighbour is (re)queued only when this
path is strictly cheaper than whatever distance it already holds.

- `@param` px Flat index of the pixel whose frontier expands.
- `@param` cur Distance of the popped pixel (its bucket slot).
