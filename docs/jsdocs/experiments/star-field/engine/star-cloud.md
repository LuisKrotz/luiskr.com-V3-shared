# `experiments/star-field/engine/star-cloud.ts`

Real-catalogue deep field — decodes

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/star-cloud.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `spectralColor`

Converts a B-V colour index into an [r,g,b] triple in 0–1 space.
The HYG `ci` column runs roughly −0.4 (hot O stars) to +2.0 (cool M
dwarfs); four tokenized stops interpolate linearly between spectral
tints so no hardcoded colours leak into the loop.
- `@param` ci B-V colour index of the star.
- `@param` THREE The three.js module (for `Color` channel math).
- `@returns` `[r,g,b]` in linear 0–1 range.

### `buildCloud`

Builds the deep-field Points object from the decoded buffer — one
vertex per catalogued object across three real datasets:
  kind 0 — 119,626 HYG stars (galactic heliocentric xyz)
  kind 1 — 5,974 NASA Exoplanet Archive planets (host-star positions)
  kind 2 — 13,963 OpenNGC deep-sky objects (galaxies, clusters,
           nebulae — redshift-derived or type-typical distances)
Positions convert heliocentric light-years to chart units through
the shared `sfChartDist` three-tier compression — the same scale the
authored catalog and registry fly-to math use, so real stars land
inside the procedural Milky Way disc and real DSOs populate the
far-field tiers. Vertex colour follows the B-V spectral ramp
for stars and a kind tint for planets/DSOs, scaled by magnitude.
- `@param` THREE The three.js module.
- `@param` buf Raw ArrayBuffer of `deep-field.bin`.
- `@returns` The Points object, or null when the buffer is malformed.

### `ensureStarCloud`

Lazy-loads the real star field once per boot — fired fire-and-forget
from bootstrap after the body graph exists, so the 1.5 MB binary
streams in the background and the cloud fades in on the disc when it
decodes. No-ops on repeat calls, dispose, or fetch failure.
- `@param` s Star engine state bag.
- `@param` THREE The three.js module (lazy-loaded by bootstrap).

### `disposeStarCloud`

Disposes the cloud geometry/material on engine teardown so a hot
reload does not leak the 78k-point buffers.
- `@param` s Star engine state bag.
