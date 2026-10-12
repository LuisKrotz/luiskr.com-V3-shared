# `experiments/star-field/engine/spiral/fill.ts`

Deterministic point-cloud fills for galaxies — the math

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/spiral/fill.ts`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `fillSpiral`

Fills the position + color buffers for one spiral galaxy: `BULGE`
fraction of points cluster in the core (tight gaussian), the rest
follow `ARMS` logarithmic arms with angular jitter and a thin vertical
gaussian so the disc reads as a real spiral at any tilt. An optional
`halo` fraction peels off the tail of the buffer into a spherical
stellar-halo distribution (globular-cluster haze standing in for the
oldest populations), and `thick` multiplies disc thickness for bodies
like the Milky Way whose volume must read as a 3-D object from inside.

- `@param` pos Float32 xyz buffer — indexes [i0·3, i1·3) are written.
- `@param` col Float32 rgb buffer (same range).
- `@param` radius Disc radius in scene units.
- `@param` seed Body seed — each point draws from its own LCG keyed by
- `@param` count Point count to fill.
- `@param` arms Spiral arm count.
- `@param` thick Disc-thickness multiplier on `SF_SPIRAL.THIN`.
- `@param` halo Fraction (0–1) of points scattered into a spherical halo.
- `@param` jitter Arm angular scatter in radians — tight jitters draw
- `@param` bubble Optional heliocentric exclusion zone — `{ x, y, z, r }`
- `@param` i0 First point index of this range (0 for the local fill).
- `@param` i1 One past the last point index (count for the local fill).

### `fillElliptical`

Fills the buffers for an elliptical dwarf galaxy — no spiral structure,
just a smooth spheroid of old stars: a gaussian radial profile (dense
core, exponential fall-off) over uniform directions, flattened on Y so
the smudge reads as a dE/dSph rather than a ball. The `tint` hex steers
the vertex ramp so spheroidals glow warm and irregulars read cooler.

- `@param` pos Float32 xyz buffer — indexes [i0·3, i1·3) are written.
- `@param` col Float32 rgb buffer (same range).
- `@param` radius Body radius in scene units.
- `@param` seed Body seed — per-point Fibonacci-hashed LCG (chunkable).
- `@param` count Point count to fill.
- `@param` tint RGB multiplier tint (from def.color channel components).
- `@param` i0 First point index of this range (0 for the local fill).
- `@param` i1 One past the last point index (count for the local fill).

### `fillDust`

Fills the dust-lane buffers — the Great Rift. Lanes hug the arm gaps
(half an arm period off the star arms) on the same golden-pitch log
spiral + sway the star fill uses, so dust traces the actual gaps
rather than a parallel-but-different curve. Per-point Fibonacci-hashed
seeds keep the fill chunkable across the worker pool.

- `@param` pos Float32 xyz buffer — indexes [i0·3, i1·3) are written.
- `@param` col Float32 rgb buffer (same range).
- `@param` seed Body seed.
- `@param` count Dust point count.
- `@param` radius Disc radius in scene units.
- `@param` arms Spiral arm count.
- `@param` i0 First point index of this range.
- `@param` i1 One past the last point index.
