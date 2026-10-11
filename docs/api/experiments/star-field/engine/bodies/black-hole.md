# `experiments/star-field/engine/bodies/black-hole.ts`

Sagittarius A* renderer — a layered relativistic object

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bodies/black-hole.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `makeAccretionDisc`

Dusty accretion annulus — a node-material ring whose heat falls off
radially and whose dust lanes break the surface into turbulent bands.
Per fragment, `k` walks the annulus inner→outer and the brightness
falls off ~quadratically (the ISCO edge is blinding, the rim fades to
dust); two detuned ring-harmonics multiply into irregular dark lanes —
the dust absorption bands real discs show — so the annulus reads as
turbulent plasma with structure, never a smooth polygon. Output is
premultiplied for additive blending (dark lanes add nothing). Built
as a TSL node graph — the WebGPURenderer pipeline rejects classic
GLSL ShaderMaterials. RingGeometry is authored flat in XY (the mesh
rotates −π/2 into the XZ disc plane), so `positionLocal.xy` is the
annulus plane coordinate.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors (bootstrap-injected).
- `@param` def Catalog entry (radius scales the annulus).

### `makeSwirl`

Orbiting accretion plasma — seeded particles inside the annulus
(DISC_INNER–DISC_OUTER × radius) on a thin vertical gaussian; colors
ramp from near-white at the ISCO edge to dim amber at the rim, which
is where the "glowing ring against black" contrast comes from. The
returned Points object is the node's spinner: frame.ts rotates its
`rotation.y` every tick so the plasma visibly orbits while the disc
ring, jets and horizon stay frame-aligned.
- `@param` THREE The three.js module.
- `@param` def Catalog entry (radius sets the annulus scale).
- `@param` glowTex Shared soft-disc texture (may be undefined).

### `makeJet`

One relativistic jet — a long additive cone along ±Y (the local disc
normal, i.e. the galactic pole for the MW-anchored Sgr A*). Slight
radial widening with distance (radius*JET_WIDTH base → near-zero tip
keeps the beam collimated) and low opacity so overlapping additive
layers never bloom white.
- `@param` THREE The three.js module.
- `@param` def Catalog entry.
- `@param` dir +1 north polar jet, −1 south.

### `makeBlackHole`

Assembles the full Sagittarius A* composite: black horizon sphere,
additive photon torus, hot accretion annulus, seeded plasma swirl
(returned as `spin` — the node's rotating layer), optional bipolar
jets, and a warm lensing glow. Everything lives in the local XZ
plane / ±Y normal, which inside the Milky Way's tilted group is the
galactic plane and poles.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors (bootstrap-injected).
- `@param` def Catalog entry (`kind: blackHole`; `jets` adds the cones).
- `@param` glowTex Shared radial-gradient glow texture (may be undefined).
- `@returns` `{ group, spin }` — scene node + per-frame rotation target.
