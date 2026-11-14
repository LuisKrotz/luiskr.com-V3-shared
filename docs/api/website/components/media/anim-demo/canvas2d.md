# `website\components\media\anim-demo\canvas2d.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\anim-demo\canvas2d.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_STAR_COUNT`

Star count in the scene demo — small enough for a 2D loop.

### `_STAR_DEPTH`

Star depth range (world z) the field recycles through.

### `_STAR_SPEED`

Star forward drift speed (units/frame at 60fps) — reads as flight.

### `readInks`

Palette snapshot — reads the theme custom properties the demo paints
with, once, off the frame loop (the nav-glyph pattern: re-reads only
happen at mount, not per frame).

- `@param` el Element the computed style resolves on (the host canvas).
- `@returns` Ink strings for ground and star.

### `ctx2d`

The stage's full-size 2D context with backing pixels matched to the
box — allocated once; resize handling lives with the widget instead
of per-frame work.

- `@param` canvas The stage canvas.
- `@returns` [ctx, dpr-scaled width, height] or null when 2D is absent.

### `mountSceneDemo`

Space-scene demo — a depth-projected starfield: preallocated stars
recycle through a z range while the projection (perspective divide,
size/alpha falloff) maps them to screen — the same depth cue the
experiments three.js scene renders on the GPU, in miniature.

- `@param` ctx The demo context (stage owns the canvas).
- `@returns` Teardown — cancels the loop.

### `still`

One settled frame — a static spread with no drift.
