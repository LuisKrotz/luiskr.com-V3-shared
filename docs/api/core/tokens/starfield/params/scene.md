# `core\tokens\starfield\params\scene.ts`

Scene-shell and fallback parameters — the skybox radius,

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\params\scene.ts`               |
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

### `SPHERE_SEGMENTS`

Sphere tessellation — 256×128 ≈ 65k triangles per body, the ultra
tier: at this density a planet's limb holds a smooth arc even at
full-screen zoom and the terminator never facets under refraction
in the fresnel shells. Catalog bodies stay resident (~150 meshes ≈
9.8M tris, still trivially GPU-bound territory) while registry
bodies ride the LRU spawn/evict path, so the budget holds.

### `ROCK_DETAIL`

Icosahedron subdivision detail for irregular bodies (Phobos-class
rubble moons, comet nuclei, catalog asteroids). `detail` is EDGE
segments, not recursion depth — faces = 20·(d+1)², so detail 64
produces ~84.5k triangles (~42.5k welded verts): the crumpled
silhouette stays continuous under glancing light at any zoom, no
facet flash at the terminator and no visible polygon edges from
afar. Only `def.irregular` bodies pay the density — a dozen
catalog bodies at most.

### `ROCK_MID_FREQ`

Mid/micro relief octaves for irregular bodies — a single low-
frequency noise pass makes every body a smooth blob, so `vnoise`
stacks three octaves: the macro crumple (1×) sets the silhouette,
`ROCK_MID_FREQ ×` adds the lumpy potato bumps real asteroids and
rubble moons carry, and `ROCK_FINE_FREQ ×` grains the surface at
regolith scale (amplitudes are fractions of `irregular.amp`).

### `AMBIENT_INT`

Fill-light intensity — kept low so the sun point light owns the
terminator and planets shade with real day/night contrast instead of
reading flat (a high ambient lifts the unlit hemisphere to nearly
the lit-side brightness and washes out every texture).

### `SUN_INT`

Sun point-light intensity at the scene origin (no decay).
