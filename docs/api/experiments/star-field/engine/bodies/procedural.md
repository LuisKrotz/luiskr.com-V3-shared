# `experiments/star-field/engine/bodies/procedural.ts`

Seeded canvas texture generation for bodies with no real

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bodies/procedural.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

RGBA components extracted from a packed hex color.

### `_SURFACE_W`

Equirect surface canvas edge — wraps a sphere 2:1 cleanly.

### `_SPRITE_PX`

Sprite texture edge for coronas and nebula gas.

### `_STYLE_MOTTLE`

Surface style buckets — how the generator dresses a body.

### `_CORONA_SPIKES`

Corona recipe — all sprite-space fractions of the half-edge:
symmetric diffraction-spike sets (always even so blades mirror
through the star), blade taper/length, and the curved wisp arcs that
stand in for a turbulent outer atmosphere.

### `rgb`

Unpacks a packed hex color into `[r, g, b]` channel floats (0–255) —
the canvas API wants css-rgba() strings, not three hex ints.
- `@param` hex Packed color int (may be undefined → neutral grey fallback
- `@returns` Channel triple.

### `css`

`rgba()` css string for a channel triple + alpha.
- `@param` c Channel triple.
- `@param` a Alpha 0–1.

### `shade`

Scales a channel triple toward white (`k > 0`) or black (`k < 0`) —
crater rims, band highlights and corona streamers all derive from the
body's own palette instead of carrying their own literals.
- `@param` c Base channel triple.
- `@param` k Shift −1..1.
- `@returns` Shifted triple.

### `texCanvas`

Creates a canvas + 2d context for texture generation, or null when
the environment has no 2d (headless probes, blocked canvas) — every
caller keeps its previous fallback in that case.
- `@param` w Canvas width px.
- `@param` h Canvas height px.

### `blob`

Soft radial blob fill — the shared paint primitive: mottle patches,
craters, gas lobes and flare knots are all radial gradients punched
into the canvas at a point.
- `@param` ctx 2d context.
- `@param` x Center x.
- `@param` y Center y.
- `@param` r Blob radius px.
- `@param` inner Inner-stop css color.
- `@param` outer Outer-stop css color (usually alpha 0).

### `surfaceStyle`

Picks the surface style for a body: moons and dwarf planets are
cratered rock; gas-rich exoplanet-sized bodies favor latitude bands;
icy surfaces favor bright streaks. The seed decides within each
kind's bias so two bodies of the same kind still differ.
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

### `surfaceFor`

Generates a seeded equirect surface texture for an untextured solid
body — planets, moons, dwarf planets and rocky exoplanet satellites
all get a distinct surface instead of a flat tint. Returns undefined
when no 2d context exists so the caller keeps the plain material.
- `@param` THREE The three.js module.
- `@param` def Body def (color = base tint, id = seed).
- `@returns` A CanvasTexture for `material.map`, or undefined.

### `coronaFor`

Generates a seeded star-corona sprite — the "alive" layer that turns
a lit disc into a sun: a warm photosphere glow, seeded radial
streamers at uneven lengths, and a few flare knots. The sprite
rotates slowly in `updateFx` so the streamers shimmer.
- `@param` THREE The three.js module.
- `@param` def Star def (color = streamer tint, id = seed).
- `@returns` A CanvasTexture for the corona sprite map, or undefined.

### `gasFor`

Generates a seeded wispy nebula-gas texture for photo-less nebulae
and clusters — a union of soft colored lobes (derived from the
catalog tint, pushed hot at the cores) with dark absorption wisps
punched through, so the body reads as sculpted gas rather than a
uniform glow disc. Returns undefined without a 2d context.
- `@param` THREE The three.js module.
- `@param` def Nebula def (color = gas tint, id = seed).
- `@returns` A CanvasTexture for the sprite map, or undefined.
