# `experiments/star-field/engine/spiral.ts`

Spiral-galaxy surface — two-layer composite: a tilted

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/spiral.ts` |
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
- `@param` pos Float32 xyz buffer (COUNT×3).
- `@param` col Float32 rgb buffer (COUNT×3).
- `@param` radius Disc radius in scene units.
- `@param` rand Seeded LCG.
- `@param` count Point count to fill.
- `@param` arms Spiral arm count.
- `@param` thick Disc-thickness multiplier on `SF_SPIRAL.THIN`.
- `@param` halo Fraction (0–1) of points scattered into a spherical halo.
- `@param` bubble Optional heliocentric exclusion zone — `{ x, y, z, r }`

### `fillElliptical`

Fills the buffers for an elliptical dwarf galaxy — no spiral structure,
just a smooth spheroid of old stars: a gaussian radial profile (dense
core, exponential fall-off) over uniform directions, flattened on Y so
the smudge reads as a dE/dSph rather than a ball. The `tint` hex steers
the vertex ramp so spheroidals glow warm and irregulars read cooler.
- `@param` pos Float32 xyz buffer.
- `@param` col Float32 rgb buffer.
- `@param` radius Body radius in scene units.
- `@param` rand Seeded LCG.
- `@param` count Point count to fill.
- `@param` tint RGB multiplier tint (from def.color channel components).

### `makeStarPoints`

One soft-sprite Points cloud — the shared glow texture gives each
vertex a round airbrushed edge instead of the default square splat,
which is what turned the old cloud into a hard-edged white blob.
- `@param` THREE The three.js module.
- `@param` pos xyz vertex buffer.
- `@param` col rgb vertex buffer.
- `@param` sizePx Point size in world units.
- `@param` glowTex Shared soft-disc texture (may be undefined).

### `makeSpiralGalaxy`

Builds a spiral galaxy node: tilted group containing the photographic
disc (or the seeded procedural spiral when no photo resolved), a soft
sparkle layer of foreground stars for depth, a warm additive core
sprite for the bulge glow, and an invisible sphere carrying
`userData.bodyId` so picking/hover work against a real mesh.
- `@param` THREE The three.js module.
- `@param` def Catalog galaxy entry (radius = disc radius, tilt = disc
- `@param` texMap Loaded texture map keyed by URL — the body's `texture`
- `@param` glowTex Shared radial-gradient glow texture (may be undefined).
- `@param` mobile Whether to apply the mobile divisor (small viewport).
- `@returns` `{ group, pick, points, rotor }` — the tilted spin target, the

### `spinCut2`

Rotor split — a volumetric galaxy with `spin` partitions its
particle fill at SF_SPIRAL.INNER_SPIN_R: points inside the cutoff
ride a rotor subgroup whose rotation.y (set by tickStar via the
node spinner) revolves the inner disc around the galactic center,
while the outer disc stays static so the carved heliocentric bubble
— which sits far outside the cutoff on the Sun's ring — is never
swept through the solar system. Real galactic rotation curves are
near-flat past the core, so a revolving core inside a still rim is
the honest read of differential rotation at chart scale.
