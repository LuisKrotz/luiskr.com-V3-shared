# `experiments/star-field/engine/bodies/procedural/gas.ts`

Seeded wispy nebula-gas texture for photo-less nebulae

|                |                                                              |
| -------------- | ------------------------------------------------------------ |
| **Source**     | `src/experiments/star-field/engine/bodies/procedural/gas.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.      |

## Members

### `gasFor`

Generates a seeded wispy nebula-gas texture for photo-less nebulae
and clusters — a union of soft colored lobes (derived from the
catalog tint, pushed hot at the cores) with dark absorption wisps
punched through, so the body reads as sculpted gas rather than a
uniform glow disc. Returns undefined without a 2d context.

- `@param` THREE The three.js module.
- `@param` def Nebula def (color = gas tint, id = seed).
- `@returns` A CanvasTexture for the sprite map, or undefined.
