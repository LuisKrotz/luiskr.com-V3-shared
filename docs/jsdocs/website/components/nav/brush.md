# `website\components\nav\brush.tsx`

The silver paintbrush glyph for &lt;app-nav&gt;'s preferences chip —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\nav\brush.tsx`                  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `stop`

`stop` bound to a --nav-metal-* CSS prop — presentation attributes can't
resolve custom properties, so the value rides inline style.

### `ref`

`url(#id)` helper for gradient references.

### `star`

Four-point sparkle star centered at (x, y) with arm radius r — quadratic
curves pinched through the center give the thin twinkle shape.

- `@param` x center x in viewBox units
- `@param` y center y in viewBox units
- `@param` r arm radius in viewBox units
- `@returns` SVG path data for the star

### `NavBrushIcon`

The <nav-brush-icon> element — the silver paintbrush. Shaft runs violet to
orange along its length; the bristle tip runs magenta to orange; the
swoosh carries the full violet-magenta-orange sweep the reference uses.

### (module scope)

Live wasm swoosh emitter — null until the module loads (CSS loops stay).

### (module scope)

Starts the wasm swoosh emitter on the brush's canvas.

### (module scope)

Releases the emitter's listeners, frame loop and wasm memory.
