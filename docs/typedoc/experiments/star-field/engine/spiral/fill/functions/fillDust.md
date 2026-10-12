[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/spiral/fill](../README.md) / fillDust

```ts
function fillDust(pos, col, seed, count, radius, arms, i0?, i1?): void
```

Defined in: experiments/star-field/engine/spiral/fill.ts:383

Fills the dust-lane buffers — the Great Rift. Lanes hug the arm gaps
(half an arm period off the star arms) on the same golden-pitch log
spiral + sway the star fill uses, so dust traces the actual gaps
rather than a parallel-but-different curve. Per-point Fibonacci-hashed
seeds keep the fill chunkable across the worker pool.

## Parameters

### pos

`Float32Array`

Float32 xyz buffer — indexes [i0·3, i1·3) are written.

### col

`Float32Array`

Float32 rgb buffer (same range).

### seed

`number`

Body seed.

### count

`number`

Dust point count.

### radius

`number`

Disc radius in scene units.

### arms

`number`

Spiral arm count.

### i0?

`number` = `0`

First point index of this range.

### i1?

`number` = `count`

One past the last point index.

## Returns

`void`
