# `website\public\wasm\theme-slider\luiskr_theme_slider.js`

|                |                                                               |
| -------------- | ------------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\theme-slider\luiskr_theme_slider.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.       |

## Members

### `ThemeSlider`

Public wasm surface — one slider canvas per instance.

### `frame`

`frame` — one animation tick: pack, write, draw.

- `@param` dt Seconds since the previous call.
- `@param` {number} dt

### `init`

`init` — device + pipeline. Rejection → JS keeps the WebGL
slider; mounting can never regress the page.

- `@param` canvas The widget's dedicated canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`ThemeSlider::new` — un-initialized widget; `init` must follow.

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

`set_state` — bundled scalar update: eased progress + knob X.

- `@param` progress 0..2 theme morph (0..1 night→system,
- `@param` knob_x Knob center X in px.
- `@param` {number} progress
- `@param` {number} knob_x

### `tap`

`tap` — registers a tap for the expanding-ring ripple: the JS
bridge passes its clock time + the tap's X position.

- `@param` time The frame clock's current seconds (matches what
- `@param` x Tap X in canvas CSS px.
- `@param` {number} time
- `@param` {number} x
