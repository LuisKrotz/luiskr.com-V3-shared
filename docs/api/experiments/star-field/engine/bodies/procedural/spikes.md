# `experiments\star-field\engine\bodies\procedural\spikes.ts`

Seeded diffraction-spike starburst — the optical cross

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\bodies\procedural\spikes.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.         |

## Members

### `_SPIKE_HALF_TURN`

Half-turn divisor mapping ray index → angle.

### `spikeRay`

Paints one spike ray — a radial gradient squeezed along its length so
the streak keeps a gaussian cross-section and melts at both ends.

- `@param` ctx 2d context.
- `@param` mid Canvas center in px.
- `@param` ang Ray angle in radians.
- `@param` len Ray half-length in px.
- `@param` thin Ray half-width as a fraction of len.
- `@param` inner Inner css color (hot core).
- `@param` outer Outer css color (alpha 0 tail).

### `spikesFor`

Generates a seeded diffraction-spike sprite — six primary rays (the
hexagonal cross of a segmented mirror) plus a fainter, shorter second
cross rotated a quarter-turn offset so the burst reads optical, not
drawn. A tight center knot anchors the burst on the photosphere.

- `@param` THREE The three.js module.
- `@param` def Star def (color = spike tint, id = seed).
- `@returns` A CanvasTexture for the spike sprite map, or undefined.
