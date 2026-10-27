# `experiments\star-field\engine\bodies\procedural\corona.ts`

Seeded star-corona sprite — the "alive" layer that turns

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\bodies\procedural\corona.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.         |

## Members

### `_CORONA_HALO_R`

Corona recipe — all sprite-space fractions of the half-edge. Light,
not geometry: stroked lines and wedges read as drawn rays no matter
how soft their gradient, so the corona is now layered luminance only —
a wide atmospheric halo, a hot photosphere knot, irregular flare
knots at the limb, and prominence filaments built as CHAINS of
shrinking soft blobs along a curved magnetic-loop path (each link a
radial gradient — nothing with a hard edge survives to crayon).

### `_CORONA_HALO_SHADE`

Halo/photosphere shade factors — low values keep the body's own tint
saturated; shading far toward white washed coronas into gray fog.

### `_CORONA_FRINGE_R`

Chromatic limb wash — refracted blue light spread through a broad,
shallow gradient (no distinct ring — a thin annulus renders as a
rainbow eye at small sprite sizes).

### `_CORONA_WISP_STEPS`

Blobs per prominence filament — enough to fuse into one curve.

### `_CORONA_WISP_BR`

Blob radius at the limb root of a filament (fraction of mid).

### `_CORONA_WISP_TAPER`

How much the filament thins toward its tip (0..1).

### `_CORONA_PLUME_MIN`

Activity threshold above which a star throws eruption plumes —
quiet dwarfs (≤1.2) keep only gentle limb prominences.

### `_CORONA_PLUME_COUNT`

Plume count base/variance, reach multiplier vs normal wisps, extra
bend (ejecta whips harder), blob size/alpha at the arc root.

### `_CORONA_CUT_IN`

Corona photosphere cutout — inner mask radius (×ball radius) and
outer feather edge: inside the sphere is cleared to transparent,
and the fade ends just past the limb so a slim chromosphere ring
survives.

### `coronaFor`

Generates a seeded star-corona sprite — the "alive" layer that turns
a lit disc into a sun: a warm photosphere glow, seeded radial
streamers at uneven lengths, and a few flare knots. The sprite
rotates slowly in `updateFx` so the streamers shimmer.

- `@param` THREE The three.js module.
- `@param` def Star def (color = streamer tint, id = seed).
- `@returns` A CanvasTexture for the corona sprite map, or undefined.
