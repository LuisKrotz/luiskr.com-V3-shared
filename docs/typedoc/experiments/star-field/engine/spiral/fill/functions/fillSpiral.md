[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/spiral/fill](../README.md) / fillSpiral

```ts
function fillSpiral(
  pos,
  col,
  radius,
  seed,
  count,
  arms,
  thick?,
  halo?,
  jitter?,
  bubble?,
  i0?,
  i1?
): void
```

Defined in: experiments/star-field/engine/spiral/fill.ts:40

Fills the position + color buffers for one spiral galaxy: `BULGE`
fraction of points cluster in the core (tight gaussian), the rest
follow `ARMS` logarithmic arms with angular jitter and a thin vertical
gaussian so the disc reads as a real spiral at any tilt. An optional
`halo` fraction peels off the tail of the buffer into a spherical
stellar-halo distribution (globular-cluster haze standing in for the
oldest populations), and `thick` multiplies disc thickness for bodies
like the Milky Way whose volume must read as a 3-D object from inside.

## Parameters

### pos

`Float32Array`

Float32 xyz buffer — indexes [i0·3, i1·3) are written.

### col

`Float32Array`

Float32 rgb buffer (same range).

### radius

`number`

Disc radius in scene units.

### seed

`number`

Body seed — each point draws from its own LCG keyed by
absolute index (`seed ^ i·SEED_STEP`), so the fill is partitionable
across worker chunks with identical output to this local path.

### count

`number`

Point count to fill.

### arms

`number`

Spiral arm count.

### thick?

`number` = `1`

Disc-thickness multiplier on `SF_SPIRAL.THIN`.

### halo?

`number` = `0`

Fraction (0–1) of points scattered into a spherical halo.

### jitter?

`number` = `SF_SPIRAL.ARM_JITTER`

Arm angular scatter in radians — tight jitters draw
crisp arm lanes (volumetric discs), loose ones a flocculent wash.

### bubble?

Optional heliocentric exclusion zone — `{ x, y, z, r }`
in the galaxy's local frame; points falling inside are resampled so
no disc star overlaps the solar system.

#### x

`number`

#### y

`number`

#### z

`number`

#### r

`number`

### i0?

`number` = `0`

First point index of this range (0 for the local fill).

### i1?

`number` = `count`

One past the last point index (count for the local fill).

## Returns

`void`
