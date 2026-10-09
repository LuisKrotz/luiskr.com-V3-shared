# `experiments/star-field/engine/bodies-scene.ts`

Scene-graph builder for the star-field catalog — turns each

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bodies-scene.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SF_USER_BODY`

`userData` key carrying the body id from mesh → raycast hit.

### `makeSphere`

Sphere + material for a solid body — textured when the catalog maps one,
tinted procedural otherwise. Stars/systems use unlit MeshBasic (they
emit their own light); planets and smaller get lit MeshStandard.
- `@param` THREE The three.js module.
- `@param` def Catalog entry.
- `@param` texMap Loaded texture map keyed by URL.

### `makeNebula`

Billboard sprite for nebulae — the shared glow texture tinted by the
body's color, additive so overlapping glow reads as light, not surface.

### `makeGalaxy`

Flat tilted disc for galaxies — a gradient-textured plane lying near
the orbital plane so it reads as a spiral seen at an angle rather than
a camera-facing billboard.

### `makeShell`

Translucent shell layer — Venus's haze atmosphere and Saturn's ring get
a secondary texture-mapped surface parented to the main mesh.
- `@param` THREE The three.js module.
- `@param` def Catalog entry.
- `@param` shellTexture Shell texture URL — narrowed non-null by the caller's
- `@param` parent The primary mesh the shell rides on.
- `@param` texMap Loaded texture map keyed by URL.

### `makeAccretion`

Accretion ring for the black hole — a hot additive torus standing in
for the glowing plasma disc of Sgr A*.

### `makeSatellites`

Decorative companion satellites — small unlit spheres on child pivots;
`satPivots` returns the {pivot,speed,phase} records frame.ts rotates.

### `makeOrbitRing`

Orbit guide ring — a thin hairline torus in the orbital plane marking
the path; centered on the parent's anchor so moon rings ride Earth.

### `buildStarBodies`

Builds every catalog body into the scene graph: pivots for orbiting
bodies (rotation.y = phase + t·speed), fixed groups for `pos` bodies,
satellites, shells and guide rings, then registers the node, anchor
and pickable in the state maps.
- `@param` s Engine state.
- `@param` THREE The three.js module.
- `@param` defs Catalog entries.
- `@param` texMap Loaded texture map keyed by URL.
- `@param` glowTex Shared glow texture for sprites/discs (may be undefined).
