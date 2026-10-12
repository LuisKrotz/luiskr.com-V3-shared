[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/spiral/fill](../README.md) / fillElliptical

```ts
function fillElliptical(pos, col, radius, seed, count, tint, i0?, i1?): void
```

Defined in: experiments/star-field/engine/spiral/fill.ts:322

Fills the buffers for an elliptical dwarf galaxy — no spiral structure,
just a smooth spheroid of old stars: a gaussian radial profile (dense
core, exponential fall-off) over uniform directions, flattened on Y so
the smudge reads as a dE/dSph rather than a ball. The `tint` hex steers
the vertex ramp so spheroidals glow warm and irregulars read cooler.

## Parameters

### pos

`Float32Array`

Float32 xyz buffer — indexes [i0·3, i1·3) are written.

### col

`Float32Array`

Float32 rgb buffer (same range).

### radius

`number`

Body radius in scene units.

### seed

`number`

Body seed — per-point Fibonacci-hashed LCG (chunkable).

### count

`number`

Point count to fill.

### tint

\[`number`, `number`, `number`\]

RGB multiplier tint (from def.color channel components).

### i0?

`number` = `0`

First point index of this range (0 for the local fill).

### i1?

`number` = `count`

One past the last point index (count for the local fill).

## Returns

`void`
