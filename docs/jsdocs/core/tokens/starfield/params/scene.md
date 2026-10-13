# `core/tokens/starfield/params/scene.ts`

Scene-shell and fallback parameters — the skybox radius,

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/tokens/starfield/params/scene.ts`               |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `STAR_DENSITY`

One star per N² css px of surface area.

### `STAR_MAX`

Hard cap so 8K displays don't allocate thousands of arcs.

### `STAR_SIZE_MAX`

Brightest star radius in css px (most stars draw smaller).

### `GLINT_RATIO`

Fraction of stars that get a diffraction-cross glint.

### `BAND_STARS`

Extra micro-stars densified along the milky band.

### `BAND_TILT`

Band slope (dy/dx) across the viewport.

### `BAND_WIDTH`

Band thickness as a fraction of viewport height.

### `DIM_ALPHA`

Alpha ceiling for the dimmest quartile of field stars.

### `SF_SCENE`

Skybox sphere + starfield scales.

### `SKYBOX_RADIUS`

Skybox sphere radius — wraps the whole multi-tier chart (the
observable-universe shell clamps at ~46k units, the skybox must sit
beyond it or the panorama would clip through the boundary).

### `ROCK_DETAIL`

Icosahedron subdivision detail for irregular bodies (Phobos-class
rubble moons) — detail 4 ≈ 5k triangles, matching the 48-segment
sphere's vertex density so a crumpled moon stays smooth between
dimples while still reading faceted at the silhouette.

### `AMBIENT_INT`

Fill-light intensity — kept low so the sun point light owns the
terminator and planets shade with real day/night contrast instead of
reading flat (a high ambient lifts the unlit hemisphere to nearly
the lit-side brightness and washes out every texture).

### `SUN_INT`

Sun point-light intensity at the scene origin (no decay).
