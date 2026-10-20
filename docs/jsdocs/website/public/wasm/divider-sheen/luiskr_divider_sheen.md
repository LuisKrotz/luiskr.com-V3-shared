# `website/public/wasm/divider-sheen/luiskr_divider_sheen.js`

|                |                                                                 |
| -------------- | --------------------------------------------------------------- |
| **Source**     | `src/website/public/wasm/divider-sheen/luiskr_divider_sheen.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.         |

## Members

### `DividerSheen`

Public wasm surface — one divider canvas per footer hairline.

### `frame`

`frame` — advance the sweep clock, repack, draw.

- `@param` dt Frame delta in seconds.
- `@returns` false once the surface is stale/lost.
- `@param` {number} dt
- `@returns` {boolean}

### `init`

`init` — device + pipeline + the single bind group.

- `@param` canvas The divider's overlay canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`DividerSheen::new` — un-initialized widget; `init` must follow.

### `resize`

`resize` — device px — the `res`/`rect` uniform.

- `@param` w @param h Backing size in device pixels.
- `@param` {number} w
- `@param` {number} h

### `set_colors`

`set_colors` — push the live theme colors (read once per
theme flip from the DOM's computed style — the shader never
sees CSS vars).

- `@param` br @param bg @param bb @param ba Hairline rgba 0-1.
- `@param` ar @param ag @param ab @param aa Accent-band rgba 0-1.
- `@param` {number} br
- `@param` {number} bg
- `@param` {number} bb
- `@param` {number} ba
- `@param` {number} ar
- `@param` {number} ag
- `@param` {number} ab
- `@param` {number} aa

### `set_size`

`set_size` — CSS px (contract parity; unused — device px only).

- `@param` _w @param _h CSS size — unused.
- `@param` {number} _w
- `@param` {number} _h
