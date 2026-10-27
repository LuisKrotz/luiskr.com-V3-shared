# `website\public\wasm\menu-background\luiskr_menu_background.js`

|                |                                                                     |
| -------------- | ------------------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\menu-background\luiskr_menu_background.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.             |

## Members

### `MenuBackground`

Public wasm surface — one fullscreen canvas per instance.

### `frame`

`frame` — one animation tick: pack, write, draw.

- `@param` dt Seconds since the previous call.
- `@param` {number} dt

### `init`

`init` — device + pipeline. Rejection → JS keeps the WebGL
backdrop; mounting can never regress the page.

- `@param` canvas The widget's dedicated canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`MenuBackground::new` — un-initialized widget; `init` follows.

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

`set_state` — bundled scalar update: reveal amount, the two
theme inks (linear 0..1 rgb triples), and the global alpha.

- `@param` reveal 0..1 menu open amount.
- `@param` r1 Primary ink red.
- `@param` g1 Primary ink green.
- `@param` b1 Primary ink blue.
- `@param` alpha Global opacity multiplier.
- `@param` r2 Secondary ink red.
- `@param` g2 Secondary ink green.
- `@param` b2 Secondary ink blue.
- `@param` {number} reveal
- `@param` {number} r1
- `@param` {number} g1
- `@param` {number} b1
- `@param` {number} alpha
- `@param` {number} r2
- `@param` {number} g2
- `@param` {number} b2
