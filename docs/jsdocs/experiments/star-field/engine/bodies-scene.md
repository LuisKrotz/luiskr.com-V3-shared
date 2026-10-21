# `experiments\star-field\engine\bodies-scene.ts`

Scene-graph assembler for the star-field catalog — turns

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\bodies-scene.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `buildStarBodies`

Builds every catalog body into the scene graph: pivots for orbiting
bodies (rotation.y = phase + t·speed), fixed groups for `pos` bodies,
satellites and shells, then registers the node, anchor
and pickable in the state maps.
- `@param` s Engine state.
- `@param` THREE The three.js module.
- `@param` defs Catalog entries.
- `@param` texMap Loaded texture map keyed by URL.
- `@param` glowTex Shared glow texture for sprites/discs (may be undefined).

### `bodySunDir`

Body-local sun direction — created only for bodies whose shading
depends on illumination (emissive maps, atmosphere rims, plume
vents); updateDayNight rewrites it per frame in `mesh` space.

### `mountGalacticRider`

Galactic co-rotation — the solar system and its stellar neighborhood
are not stationary: the real Galaxy carries the Sun around the
galactic centre, so everything heliocentric must ride the Milky
Way's rotating disc as one structure. This mounts a rider group on
the disc's spin target at the Sun's true local ring position, then
re-parents every unparented node whose whole extent fits inside
SF_SCALE.CO_ROTATE_R — the Sun's pivot (which carries the planets,
their satellites, and later the deep-field star cloud), orbiting
bodies pivoted at the origin, the named-star neighborhood, and the
local hierarchy shells. Because the carved heliocentric bubble lives
in the same rotating frame, it stays locked on the Sun forever — the
earlier static-outer-disc workaround is no longer needed.
The rider counter-tilts its own X so children keep their ecliptic
orientation (the solar system's plane is not the galactic plane).
- `@param` s Engine state (nodes map must be fully populated).
- `@param` THREE The three.js module.
