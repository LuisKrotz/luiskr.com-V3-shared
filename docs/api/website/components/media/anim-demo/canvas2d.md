# `website\components\media\anim-demo\canvas2d.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\canvas2d.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_GLITCH_PERIOD`

Glitch slice cadence — a burst every ~90 frames at 60fps.

### `_GLITCH_SLICES`

Glitch slice count per burst (horizontal bands offset).

### `_GLITCH_SHIFT`

Max slice displacement in device pixels.

### `_STAR_COUNT`

Star count in the scene demo — small enough for a 2D loop.

### `_STAR_DEPTH`

Star depth range (world z) the field recycles through.

### `_STAR_SPEED`

Star forward drift speed (units/frame at 60fps) — reads as flight.

### `readInks`

Palette snapshot — reads the theme custom properties the two 2D
demos paint with, once, off the frame loop (the nav-glyph pattern:
re-reads only happen at mount, not per frame).

- `@param` el Element the computed style resolves on (the host canvas).
- `@returns` Ink strings for ground/silhouette/star and the two tints.

### `ctx2d`

The stage's full-size 2D context with backing pixels matched to the
box — allocated once; resize handling lives with the widget instead
of per-frame work.

- `@param` canvas The stage canvas.
- `@returns` [ctx, dpr-scaled width, height] or null when 2D is absent.

### `mountGlitchDemo`

Glitch-portrait demo — paints a portrait silhouette to an offscreen
canvas once, then per frame redraws it whole plus an intermittent
burst of horizontal slices displaced left/right in alternating
neon tints — the channel split the real session produces around the
portrait's edges.

- `@param` ctx The demo context (stage owns the canvas).
- `@returns` Teardown — cancels the loop.

### `still`

One settled frame under reduced motion.

### `mountSceneDemo`

Space-scene demo — a depth-projected starfield: preallocated stars
recycle through a z range while the projection (perspective divide,
size/alpha falloff) maps them to screen — the same depth cue the
experiments three.js scene renders on the GPU, in miniature.

- `@param` ctx The demo context (stage owns the canvas).
- `@returns` Teardown — cancels the loop.

### `still`

One settled frame — a static spread with no drift.

### `_MESH_ROWS`

Mesh dot rows — the portrait halo's concentric lattice depth.

### `_MESH_DOTS`

Dots per lattice row — dense enough to read as a ring ribbon.

### `_MESH_GUIDES`

Precessing guide-line count — the radiating dotted spokes.

### `mountMeshDemo`

About-mesh demo — a miniature of the portrait's light-field halo:
concentric dot rows whose radius oscillates with a traveling radial
sinusoid, plus slowly precessing dotted guide spokes — the undulating
lattice ring the real mesh.ts paints behind the About photo.

- `@param` ctx The demo context (stage owns the canvas).
- `@returns` Teardown — cancels the loop.

### `paint`

One lattice paint at phase t — the row radius breathes with the
traveling sinusoid, dots shrink toward the rim.
