# `experiments\star-field\engine\bodies\primitives.ts`

Per-body mesh builders for the scene-graph assembler in

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\bodies\primitives.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SF_USER_BODY`

`userData` key carrying the body id from mesh → raycast hit.

### `SF_USER_PROXY`

`userData` flag marking an invisible oversized pick proxy — picking
prefers a real-mesh hit down the ray so proxy bubbles never eclipse
the bodies they overlap.

### `SF_USER_DETAIL_R`

`userData` key overriding a detail object's LOD reveal distance —
updateLod reads it as an absolute camera-to-anchor reach. Local-scale
detail (the LEO satellite swarm, ISS-class orbiters) must not inherit
the host's heliocentric `orbit` in the generic `PAD + size·SCALE`
reach or Earth's near-field shell would render from halfway across
the chart; these objects carry their own honest reach instead.

### `makePickProxy`

Invisible pick bubble for bodies too small to hit reliably — planets
and moons under `SF_DETAIL.PICK_MIN` world units subtend a handful of
pixels at the home camera, so a slightly larger transparent sphere
(riding inside `mesh` to inherit orbit position and spin) gives the
raycaster a usable target. Marked `SF_USER_PROXY` so a real-mesh hit
along the same ray always wins; the caller stamps the body id on
`userData` since the proxy is shared across kinds.
- `@param` THREE The three.js module.
- `@param` radius The body's true radius — the proxy scales with it so
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

### `irregularGeometry`

Triaxial rubble-pile geometry for `def.irregular` bodies — a detail-7
icosahedron crumpled by two octaves of seeded value noise so the
silhouette dimples like a captured asteroid instead of reading as a
hydrostatic ball. Every vertex sits on the sphere (r = def.radius);
the macro displacement `vnoise(unit)·amp` pushes it along its own
normal, then a fine octave at `ROCK_FINE_FREQ ×` adds regolith-scale
grain so the shading never reads as one smooth lump,
then `axes` stretches the solid into the body's true triaxial
proportions (Phobos ≈ 27×22×18 km → [1, 0.81, 0.67]). Per-vertex
spherical UVs (u = atan2 longitude, v = asin latitude) are baked
from the PRE-stretch unit direction so an equirect map still wraps
pole-to-pole without smearing across the crumpled facets.
- `@param` THREE The three.js module.
- `@param` def Catalog entry — `irregular` carries amp + optional axes.
- `@returns` Crumpled geometry with spherical UVs + smooth normals.

### `makeSphere`

Sphere + material for a solid body — textured when the catalog maps one,
tinted procedural otherwise. Stars/systems use the fresnel-limb node
material (they emit their own light); planets and smaller get lit
MeshStandard. When `sunDir` is passed (day/night registry vector) the
body upgrades to `MeshStandardNodeMaterial` so the emissive layer can
be gated by the sun direction — city lights never glow on the lit
hemisphere.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors.
- `@param` def Catalog entry.
- `@param` texMap Loaded texture map keyed by URL.
- `@param` sunDir Shared sun-direction vector (mutated per frame by

### `makeCloudShell`

Extra translucent sphere one shell above a surface — Earth's cloud
deck rides a white-on-black map under additive blending so the dark
sky between clouds contributes nothing; the deck scales slightly past
the surface sphere so it reads as atmosphere, not paint.
- `@param` THREE The three.js module.
- `@param` def Catalog entry (radius sizes the shell).
- `@param` cloudTex The loaded cloud map (caller guards its presence).

### `makeAtmoShell`

Atmosphere rim shell — a fresnel-limb translucent sphere just past
the surface whose tint migrates with the sun direction: deep blue on
the night limb, bright scattering blue on the day limb, and a warm
amber band through the terminator (rayleigh→mie analogy). Opacity
also dims on the night side so the rim reads thinnest where the air
is unlit. `updateDayNight` keeps the shared `sunDir` vector current.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors (bootstrap-injected).
- `@param` def Catalog entry — `def.atmosphere` scales the base opacity.
- `@param` sunDir Shared sun-direction vector (mutated per frame).

### `makeStarHalo`

Additive halo sprite behind a luminous body — stars and the Sun glow
like point sources on a real long-exposure frame instead of rendering
as flat colored balls. Kept off the LOD `detail` list: a star's glow
IS its far-field representation.
- `@param` THREE The three.js module.
- `@param` def Catalog entry (color tints the halo).
- `@param` glowTex Shared radial-gradient glow texture (may be undefined).
- `@param` flat Point-star mode — a filled core glow (no photosphere behind

### `ringStripFor`

Paints a radius-indexed ring strip for ringed bodies with no photo
texture (Uranus, Neptune) — u sweeps inner→outer radius, matching the
UV remap makeShell applies to RingGeometry. Seeded thin dusty bands:
the real ice-giant ring systems are a handful of razor-thin dark
arcs (Uranus: 13 narrow rings, albedo ~0.02; Neptune: 5 faint arcs),
so the strip stays mostly transparent with sparse low-alpha bands —
never Saturn's broad bright plate.
- `@param` THREE The three.js module.
- `@param` def Catalog entry — seeds the band layout + tints from color.
- `@returns` A CanvasTexture, or undefined without a 2d context.

### `makeShell`

Translucent shell layer — Venus's haze atmosphere and the giant
planets' rings get a secondary texture-mapped surface parented to
the main mesh. A ringed body with no authored texture (Uranus,
Neptune) falls back to `ringStripFor`'s seeded dusty bands; radii
default to Saturn's strip but `def.ringInner`/`ringOuter` pin the
honest per-body span. Returns the created Object3D so the caller can
register it as LOD detail.
- `@param` THREE The three.js module.
- `@param` def Catalog entry.
- `@param` shellTexture Shell texture URL — undefined for procedural rings.
- `@param` parent The primary mesh the shell rides on.
- `@param` texMap Loaded texture map keyed by URL.

### `posAttr`

RingGeometry ships planar UVs (the ring occupies uv-space like a
circle inscribed in a square), but the Saturn strip texture is
radius-indexed — u sweeps inner→outer across the banded ring face.
Remap each vertex's u to its normalized radius (v rides the strip's
center row) so the C/B/A ring bands and the Cassini gap land at
their true radii instead of smearing into a solid plate.

### `makeStation`

Crafted-station silhouette — a crewed orbiter (the ISS) is not a ball
of light: a long truss carries a pressurized-module core at centre and
a pair of wide flat solar-array wings at the tips, all in lit
MeshStandardMaterial so the station glints in sunlight and goes dark
through eclipse instead of glowing. All proportions derive from
`sat.radius` so the model shrinks with the solar tier.
- `@param` THREE The three.js module.
- `@param` sat Satellite def — `radius` is the core scale unit.
- `@returns` The station group (caller positions it on its pivot).

### `makeSatellites`

Decorative companion satellites — small unlit spheres on child pivots;
`sat.station` swaps the glow ball for the crafted truss-and-panels
model (ISS). Plain companions carry the same fresnel-limb material as
before but now modulated by a surface — the satellite's own photo
(`sat.texture`, preloaded with the host's maps) or a seeded
`surfaceFor` equirect keyed on `host:sat:index`, so companion worlds
are textured bodies too, not bare glow dots. `satPivots` returns the
{pivot,speed,phase} records frame.ts rotates.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors.
- `@param` def Catalog entry — `satellites` lists the companions.
- `@param` mesh The host body mesh — pivots attach to it to orbit.
- `@param` texMap Loaded texture map keyed by URL.
