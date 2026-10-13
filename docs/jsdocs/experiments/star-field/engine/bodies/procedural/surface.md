# `experiments/star-field/engine/bodies/procedural/surface.ts`

Seeded equirect surface textures for untextured solid

|                |                                                                  |
| -------------- | ---------------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/procedural/surface.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.          |

## Members

### `_STYLE_MOTTLE`

Surface style buckets — how the generator dresses a body.

### `surfaceStyle`

Picks the surface style for a body: moons, asteroids and dwarf
planets are cratered rock; gas-rich exoplanet-sized bodies favor
latitude bands; icy surfaces favor bright streaks. An authored
`def.surface` recipe (SF_SURFACES) overrides the draw — the catalog
pins it when the dossier describes a specific climate, so a lava
planet can never come out banded or oceanic. Otherwise the seed
decides within each kind's bias so two bodies of the same kind
still differ.

- `@param` def Body def.
- `@param` rand Seeded RNG.

### `mottle`

Fills the equirect canvas with the body's base color plus seeded
large-scale mottling — continental-scale albedo patches so the sphere
never reads as a single flat tint.

- `@param` ctx 2d context (SURFACE_W×SURFACE_H).
- `@param` base Body channel triple.
- `@param` rand Seeded RNG.
- `@param` patches Blob count — moons/dwarfs are heavily mottled.

### `craters`

Crater field — small dark discs with a brighter rim offset, the
signature of an airless rocky surface at texture-zoom. Only painted
for MOON/DWARF kinds.

- `@param` ctx 2d context.
- `@param` base Body channel triple.
- `@param` rand Seeded RNG.
- `@param` count Crater count.

### `bands`

Latitude bands — jittered horizontal stripes for gas giants; edge
wobble via sinusoidal offsets so the bands read as turbulent jet
streams, not a barcode.

- `@param` ctx 2d context.
- `@param` base Body channel triple.
- `@param` rand Seeded RNG.

### `streaks`

Ice streaks — long bright diagonal cracks over the base, the Europa/
Enceladus look: a handful of soft bright gradients at seeded angles.

- `@param` ctx 2d context.
- `@param` base Body channel triple.
- `@param` rand Seeded RNG.

### `lava`

Lava veins — glowing fault cracks over a dark crust, the read for a
world too hot to hold surface water (Proxima d, TRAPPIST-1b): a
crumpled black-crust base gets split by bright molten streaks plus a
few radiating hot-spot calderas.

- `@param` ctx 2d context.
- `@param` base Body channel triple (already darkened crust).
- `@param` rand Seeded RNG.

### `ocean`

Ocean surface — deep water base with broad island/ice mottling and
bright polar caps (top and bottom of the equirect map), the read for
a temperate water world (TRAPPIST-1e/f candidates).

- `@param` ctx 2d context.
- `@param` base Body channel triple.
- `@param` rand Seeded RNG.

### `surfaceFor`

Generates a seeded equirect surface texture for an untextured solid
body — planets, moons, dwarf planets and rocky exoplanet satellites
all get a distinct surface instead of a flat tint. Returns undefined
when no 2d context exists so the caller keeps the plain material.

- `@param` THREE The three.js module.
- `@param` def Body def (color = base tint, id = seed).
- `@returns` A CanvasTexture for `material.map`, or undefined.
