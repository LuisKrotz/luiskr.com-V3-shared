[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/traversal](../README.md) / bakeTraversalField

```ts
function bakeTraversalField(data, width, height, cells): void
```

Defined in: website/components/media/draw-text/traversal.ts:94

`bakeTraversalField` — floods each cell's ink from its pen-entry point
and writes the normalized visit order into the atlas' R channel, in
place. Pixels the flood cannot reach keep their painted R=255 so they
write last (pen lift) or never (paper — alpha masks them out anyway).

The bucket queue is a bounded drain loop, not stack emulation: each
pixel is enqueued at most once per relaxation and dist strictly
decreases per re-push, so the ring always empties.

## Parameters

### data

`Uint8ClampedArray`

RGBA bytes of the painted atlas (`ctx.getImageData().data`).

### width

`number`

Atlas width in px.

### height

`number`

Atlas height in px (the atlas is a single row of cells).

### cells

[`TraversalCell`](../interfaces/TraversalCell.md)[]

Per-glyph x-ranges, in atlas order.

## Returns

`void`
