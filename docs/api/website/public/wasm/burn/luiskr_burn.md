# `website\public\wasm\burn\luiskr_burn.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\burn\luiskr_burn.js`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Burn`

Public wasm surface — one burn canvas per instance (the mosaic
mounts one per title interaction).

### `begin`

`begin` — start a sim session: `dir` +1 burns, −1 rebuilds;
`origin` is the widget's CSS-px offset inside the canvas;
`seed` makes the xorshift deterministic per session.

- `@param` dir +1.0 burn / −1.0 rebuild.
- `@param` ox Widget origin X, canvas CSS px.
- `@param` oy Widget origin Y, canvas CSS px.
- `@param` seed Deterministic xorshift seed (0 → session default).
- `@param` {number} dir
- `@param` {number} ox
- `@param` {number} oy
- `@param` {number} seed

### `frame`

`frame` — one animation tick: advance the sim, emit instances,
upload, draw. Per-frame cost: O(particles) scalar math + one
instance write + one `draw(6, n)` — one JS→wasm crossing total.

- `@param` dt Seconds since the previous call.
- `@param` {number} dt

### `init`

`init` — device + pipeline + buffers. Rejection → JS keeps the
2D-canvas burn; mounting can never regress the page.

- `@param` canvas The widget's dedicated canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `live_particles`

`live_particles` — the sim's live-particle count. The JS loop
polls this for its settle check: the burn canvas can idle once
the front is spent AND the last ember died (mirroring the JS
sim's `particles.length === 0` condition).

- `@returns` Live particle count (0 when no sim is mounted).
- `@returns` {number}

### `constructor`

`Burn::new` — un-initialized surface; `init` must follow.

### `resize`

`resize` — canvas-bitmap change → surface re-configure.

- `@param` _w Device-pixel width (element-side).
- `@param` _h Device-pixel height.
- `@param` {number} _w
- `@param` {number} _h

### `set_colors`

`set_colors` — the ember ramp + scorch tint: [core, mid, edge,
scorch] × rgba = 16 f32s.

- `@param` flat Flat f32 color table.
- `@param` {Float32Array} flat

### `set_dir`

`set_dir` — +1 burn, −1 rebuild.

- `@param` dir Direction discriminant.
- `@param` {number} dir

### `set_ink`

`set_ink` — per-column ink occupancy bytes (the front's paper
mask — where burn front edges can live).

- `@param` ink One byte per pixel-column.
- `@param` {Uint8Array} ink

### `set_letters`

`set_letters` — the letter table: 6 f32s per glyph (rect +
speeds — see `sim::BurnSim::set_letters` for the exact layout).

- `@param` flat Flat f32 letter table.
- `@param` {Float32Array} flat

### `set_origin`

`set_origin` — move the burn origin (the widget rect moved).

- `@param` ox New origin X, canvas CSS px.
- `@param` oy New origin Y, canvas CSS px.
- `@param` {number} ox
- `@param` {number} oy

### `set_size`

`set_size` — the canvas's CSS-pixel size (viewport uniform).

- `@param` w Canvas width in CSS pixels.
- `@param` h Canvas height in CSS pixels.
- `@param` {number} w
- `@param` {number} h

### `set_stage`

`set_stage` — per-frame stage + jagged amplitude pushed by the
bridge before `frame`.

- `@param` stage Global burn progress 0..1.
- `@param` jag_amp Jagged-edge amplitude in px.
- `@param` {number} stage
- `@param` {number} jag_amp
