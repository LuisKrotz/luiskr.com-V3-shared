# `experiments/star-field/engine/bodies-scene.ts`

Scene-graph builder for the star-field catalog — turns each

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bodies-scene.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SF_USER_BODY`

`userData` key carrying the body id from mesh → raycast hit.

### `SF_USER_PROXY`

`userData` flag marking an invisible oversized pick proxy — picking
prefers a real-mesh hit down the ray so proxy bubbles never eclipse
the bodies they overlap.

### `makePickProxy`

Invisible pick bubble for bodies too small to hit reliably — planets
and moons under `SF_DETAIL.PICK_MIN` world units subtend a handful of
pixels at the home camera, so a slightly larger transparent sphere
(riding inside `mesh` to inherit orbit position and spin) gives the
raycaster a usable target. Marked `SF_USER_PROXY` so a real-mesh hit
along the same ray always wins; the caller stamps the body id on
`userData` since the proxy is shared across kinds.
- `@param` THREE The three.js module.
- `@returns` The invisible proxy mesh.

### `makeGlowSphereMaterial`

Luminous-sphere node material — a star's disc must not read as a flat
polygon. The fresnel rim `(1 − |view·n|)^falloff` mixes the body's
color/texture toward the limb tint and dips the alpha at the extreme
silhouette, so the photosphere dissolves into its additive halo
instead of cutting a hard circle against the sky. Built as a
MeshBasicNodeMaterial — the WebGPURenderer node pipeline rejects
classic GLSL ShaderMaterials.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors (bootstrap-injected).
- `@param` colorHex Core tint (def.color; SUN_LIGHT fallback).
- `@param` tex Optional photosphere texture — modulates the core.
- `@param` rimTint Limb color (hot rim for stars, muted for moons).
- `@param` falloff Fresnel exponent — higher keeps a tight bright core.

### `makeSphere`

Sphere + material for a solid body — textured when the catalog maps one,
tinted procedural otherwise. Stars/systems use the fresnel-limb node
material (they emit their own light); planets and smaller get lit
MeshStandard.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors.
- `@param` def Catalog entry.
- `@param` texMap Loaded texture map keyed by URL.

### `makeCloudShell`

Extra translucent sphere one shell above a surface — Earth's cloud
deck rides a white-on-black map under additive blending so the dark
sky between clouds contributes nothing; the deck scales slightly past
the surface sphere so it reads as atmosphere, not paint.
- `@param` THREE The three.js module.
- `@param` def Catalog entry (radius sizes the shell).
- `@param` cloudTex The loaded cloud map (caller guards its presence).

### `makeStarHalo`

Additive halo sprite behind a luminous body — stars and the Sun glow
like point sources on a real long-exposure frame instead of rendering
as flat colored balls. Kept off the LOD `detail` list: a star's glow
IS its far-field representation.
- `@param` THREE The three.js module.
- `@param` def Catalog entry (color tints the halo).
- `@param` glowTex Shared radial-gradient glow texture (may be undefined).

### `makeShell`

Translucent shell layer — Venus's haze atmosphere and Saturn's ring get
a secondary texture-mapped surface parented to the main mesh. Returns
the created Object3D so the caller can register it as LOD detail.
- `@param` THREE The three.js module.
- `@param` def Catalog entry.
- `@param` shellTexture Shell texture URL — narrowed non-null by the caller's
- `@param` parent The primary mesh the shell rides on.
- `@param` texMap Loaded texture map keyed by URL.

### `posAttr`

RingGeometry ships planar UVs (the ring occupies uv-space like a
circle inscribed in a square), but the Saturn strip texture is
radius-indexed — u sweeps inner→outer across the banded ring face.
Remap each vertex's u to its normalized radius (v rides the strip's
center row) so the C/B/A ring bands and the Cassini gap land at
their true radii instead of smearing into a solid plate.

### `makeSatellites`

Decorative companion satellites — small unlit spheres on child pivots;
`satPivots` returns the {pivot,speed,phase} records frame.ts rotates.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors.
- `@param` def Catalog entry — `satellites` lists the companions.
- `@param` mesh The host body mesh — pivots attach to it to orbit.

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
