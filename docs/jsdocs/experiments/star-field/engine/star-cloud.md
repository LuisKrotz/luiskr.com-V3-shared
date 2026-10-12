# `experiments/star-field/engine/star-cloud.ts`

Real-catalogue deep field — decodes

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/star-cloud.ts`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

RGB channel triple in 0–1 space.

### `rgbOf`

Unpacks a packed hex color into a normalized channel triple — pure
math (no THREE.Color) so the identical code path runs inside the
decode workers.

- `@param` hex Packed color int.

### `lerpRgb`

Linear channel-triple lerp.

### `spectralColor`

Converts a B-V colour index into an [r,g,b] triple in 0–1 space.
The HYG `ci` column runs roughly −0.4 (hot O stars) to +2.0 (cool M
dwarfs); four tokenized stops interpolate linearly between spectral
tints so no hardcoded colours leak into the loop.

- `@param` ci B-V colour index of the star.
- `@returns` `[r,g,b]` in linear 0–1 range.

### `decodeRange`

Decodes one record range of the packed deep-field binary into pos/col
buffers — identical math to the SF_DECODE_DEEPFIELD worker handler so
a chunk computed locally is indistinguishable from a worker result.
Records: kind 0 — HYG stars (galactic heliocentric xyz), kind 1 —
NASA Exoplanet Archive planets, kind 2 — OpenNGC deep-sky objects.
Positions convert heliocentric light-years to chart units through the
shared `sfChartDist` three-tier compression; vertex colour follows
the B-V spectral ramp for stars and kind tints for planets/DSOs.

- `@param` f32 Record view (x,y,z,mag,ci,kind ×N).
- `@param` pos xyz buffer — compacted output from index 0.
- `@param` col rgb buffer (same).
- `@param` i0 First record index.
- `@param` i1 One past the last record index.
- `@returns` Live record count written (sentinel drops compact out).

### `buildCloud`

Builds the deep-field Points object from decoded buffers — one
vertex per catalogued object, vertex-colored by spectral ramp/kind
tint and magnitude. The decode itself runs chunked across the WASM
worker pool (SF_DECODE_DEEPFIELD) with `decodeRange` as the identical
local fallback.

- `@param` THREE The three.js module.
- `@param` pos Decoded xyz buffer.
- `@param` col Decoded rgb buffer.
- `@returns` The Points object.

### `ensureStarCloud`

Lazy-loads the real star field once per boot — fired fire-and-forget
from bootstrap after the body graph exists, so the 1.5 MB binary
streams in the background and the cloud fades in on the disc when it
decodes. The record decode dispatches chunked through the WASM worker
pool (the raw payload rides structuredClone so the main thread keeps
its buffer for the identical local fallback). No-ops on repeat calls,
dispose, or fetch failure.

- `@param` s Star engine state bag.
- `@param` THREE The three.js module (lazy-loaded by bootstrap).

### `disposeStarCloud`

Disposes the cloud geometry/material on engine teardown so a hot
reload does not leak the 78k-point buffers.

- `@param` s Star engine state bag.
