# `experiments/star-field/engine/bodies/procedural/star-surface.ts`

Seeded equirect photosphere texture for luminous bodies —

|                |                                                                       |
| -------------- | --------------------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/procedural/star-surface.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.               |

## Members

### `_GRANULE_COUNT`

Photosphere granulation cell count and contrast — fine convection
cells (the Sun's boiling surface at telescope zoom), not the broad
continental mottling planets get.

### `_SPOT_MIN`

Sunspot field — activity threshold to draw groups, base group count,
active-latitude band (equirect v-fraction), umbra/penumbra radii and
depths, and the facula bright-rim strength. Depths/alpha are chosen
to stay under the fresnel limb so spots read as magnetism, not dirt.

### `starSurfaceFor`

Generates a seeded equirect photosphere texture for a luminous body —
hundreds of small offset granulation cells modulate the star's tint
so the sphere reads as a boiling photosphere (convection granules)
rather than a smooth egg; the fresnel material modulates this map
into the limb tint at grazing angles, which stands in for limb
darkening + refraction. Returns undefined without a 2d context.

- `@param` THREE The three.js module.
- `@param` def Star def (color = photosphere tint, id = seed).
- `@returns` A CanvasTexture for the glow-sphere's color modulate, or undefined.
