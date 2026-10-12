# `experiments/star-field/engine/bodies/procedural/shared.ts`

Shared paint primitives for the seeded texture

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/procedural/shared.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.         |

## Members

### (module scope)

Three.js module dynamic import type.

### (module scope)

RGBA components extracted from a packed hex color.

### `SURFACE_W`

Equirect surface canvas width — wraps a sphere 2:1 cleanly.

### `SURFACE_H`

Equirect surface canvas height — wraps a sphere 2:1 cleanly.

### `SPRITE_PX`

Sprite texture edge for coronas and nebula gas.

### `GAS_PX`

Gas sprite canvas edge in pixels.

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
