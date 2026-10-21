# `experiments\star-field\engine\spiral\galaxy.ts`

Spiral-galaxy assembly — `makeSpiralGalaxy` composes a

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\spiral\galaxy.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

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
ride a rotor subgroup that tickFrame spins ROTOR_DIFF× faster than
the whole-disc spin, so the core laps the rim the way real flat
rotation curves do. The rotor/inner geometries mount eagerly
(empty) and receive their attributes when the fill resolves — the
carve-out bubble co-rotates rigidly with the rider-mounted Sun so
rigid whole-disc spin never sweeps it through the solar system.

### `applyFill`

Writes a resolved fill into the geometries — with a rotor the
buffers partition at spinCut2 (inner cloud ↔ outer disc, order
preserved); without it the cloud takes the buffers whole.
- `@param` p Filled xyz buffer.
- `@param` c Filled rgb buffer.
- `@param` geo Target geometry (star cloud or dust lanes).
- `@param` into Inner geometry when a rotor split applies.
