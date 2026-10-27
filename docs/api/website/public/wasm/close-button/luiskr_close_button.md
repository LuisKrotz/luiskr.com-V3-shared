# `website\public\wasm\close-button\luiskr_close_button.js`

|                |                                                               |
| -------------- | ------------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\close-button\luiskr_close_button.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.       |

## Members

### `CloseButton`

Public wasm surface — one button canvas per instance.

### `click`

`click` — registers a click for the shockwave ring: the bridge
passes the frame clock's current seconds (the shader computes
`time - click_time` for ring expansion/fade).

- `@param` time The frame clock's current seconds.
- `@param` {number} time

### `frame`

`frame` — one animation tick: pack, write, draw.

- `@param` dt Seconds since the previous call.
- `@param` {number} dt

### `init`

`init` — device + pipeline. Rejection → JS keeps the WebGL
button; mounting can never regress the page.

- `@param` canvas The widget's dedicated canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`CloseButton::new` — un-initialized widget; `init` must follow.

### `resize`

`resize` — canvas-bitmap change → surface re-configure.

- `@param` _w Device-pixel width (element-side).
- `@param` _h Device-pixel height.
- `@param` {number} w
- `@param` {number} h

### `set_size`

`set_size` — the canvas's CSS-pixel size (res + rect).

- `@param` w Canvas width in CSS pixels.
- `@param` h Canvas height in CSS pixels.
- `@param` {number} w
- `@param` {number} h

### `set_state`

`set_state` — bundled scalar update: liquid fill, X stroke
progress, X rotation. All eased JS-side; the shader just draws.

- `@param` liquid 0..1 fill height.
- `@param` draw 0..1 X stroke progress.
- `@param` rot X rotation in radians.
- `@param` {number} liquid
- `@param` {number} draw
- `@param` {number} rot
