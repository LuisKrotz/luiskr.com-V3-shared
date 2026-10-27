# `website\public\wasm\switch-slider\luiskr_switch_slider.js`

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\switch-slider\luiskr_switch_slider.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.         |

## Members

### `SwitchSlider`

Public wasm surface — one toggle canvas per instance.

### `frame`

`frame` — one animation tick: pack, write, draw.

- `@param` dt Seconds since the previous call.
- `@param` {number} dt

### `init`

`init` — device + pipeline. Rejection → JS keeps the WebGL
toggle; mounting can never regress the page.

- `@param` canvas The widget's dedicated canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`SwitchSlider::new` — un-initialized widget; `init` must follow.

### `resize`

`resize` — canvas-bitmap change → surface re-configure + the
DEVICE-pixel size that becomes `rect.zw` (the frag→uv divisor;
`frag` arrives in device px, so the divisor must too).

- `@param` w Device-pixel width (element CSS px × DPR).
- `@param` h Device-pixel height.
- `@param` {number} w
- `@param` {number} h

### `set_size`

`set_size` — the canvas's CSS-pixel size (res + rect). NOTE: the
shader's pixel-space math assumes the design height (~28px) —
mount the canvas at the design size.

- `@param` w Canvas width in CSS pixels.
- `@param` h Canvas height in CSS pixels.
- `@param` {number} w
- `@param` {number} h

### `set_state`

`set_state` — bundled scalar update: eased progress, knob X,
and the context personality (0 stats / 1 grid / 2 motion —
mirrored by `GPU_SWITCH_CONTEXTS` on the JS side).

- `@param` progress 0..1 eased on-ness.
- `@param` knob_x Knob center X in px.
- `@param` context Track personality discriminant.
- `@param` {number} progress
- `@param` {number} knob_x
- `@param` {number} context
