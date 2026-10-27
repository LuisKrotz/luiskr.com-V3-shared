# `website\public\wasm\burger\luiskr_burger.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\burger\luiskr_burger.js`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Burger`

Public wasm surface — one burger canvas per instance.

### `frame`

`frame` — one animation tick: pack the 8-f32 block, write, draw.

- `@param` dt Seconds since the previous call.
- `@param` {number} dt

### `init`

`init` — acquire device + compile the pipeline. Rejection → JS
keeps the DOM/CSS burger; mounting can never regress the page.

- `@param` canvas The widget's dedicated canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`Burger::new` — un-initialized widget; `init` must follow.

### `resize`

`resize` — canvas-bitmap change → surface re-configure + the
DEVICE-pixel size that becomes `rect.zw` (the frag→uv divisor;
`frag` arrives in device px, so the divisor must too, or every
widget renders squashed at DPR ≠ 1).

- `@param` w Device-pixel width (element CSS px × DPR).
- `@param` h Device-pixel height.
- `@param` {number} w
- `@param` {number} h

### `set_dark`

`set_dark` — the theme lerp: 0 = light, 1 = dark. Clamped —
the shader lerps ink colors on this factor.

- `@param` v Theme darkness 0..1.
- `@param` {number} v

### `set_size`

`set_size` — the canvas's CSS-pixel size (the `res` field —
the shader's design-unit domain; `uv * res` yields CSS px).

- `@param` w Canvas width in CSS pixels.
- `@param` h Canvas height in CSS pixels.
- `@param` {number} w
- `@param` {number} h
