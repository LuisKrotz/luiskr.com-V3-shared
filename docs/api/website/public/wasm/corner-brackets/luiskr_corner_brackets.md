# `website\public\wasm\corner-brackets\luiskr_corner_brackets.js`

|                |                                                                     |
| -------------- | ------------------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\corner-brackets\luiskr_corner_brackets.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.             |

## Members

### `CornerBrackets`

Public wasm surface — one bracket canvas per button.

### `frame`

`frame` — repack the uniform block, draw the brackets.

- `@param` _dt Frame delta — unused (the shader is stateless:
- `@returns` false once the surface is stale/lost.
- `@param` {number} _dt
- `@returns` {boolean}

### `init`

`init` — device + pipeline + uniform bind group.

- `@param` canvas The overlay canvas (the button's own box).
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`CornerBrackets::new` — un-initialized widget; `init` must
follow.

### `resize`

`resize` — device px — the `res` uniform.

- `@param` w @param h Backing size in device pixels.
- `@param` {number} w
- `@param` {number} h

### `set_arms`

`set_arms` — push the stub/full arm lengths and hairline (all
device px — JS computes them from the rect + tokens once).

- `@param` a0w @param a0h Stub arm lengths.
- `@param` a1w @param a1h Full arm lengths.
- `@param` hair Hairline half-width in device px.
- `@param` {number} a0w
- `@param` {number} a0h
- `@param` {number} a1w
- `@param` {number} a1h
- `@param` {number} hair

### `set_colors`

`set_colors` — push the resting/hover colors (computed style
read once per theme flip — the shader never sees CSS vars).

- `@param` er @param eg @param eb @param ea Resting rgba 0-1.
- `@param` ar @param ag @param ab @param aa Hover rgba 0-1.
- `@param` {number} er
- `@param` {number} eg
- `@param` {number} eb
- `@param` {number} ea
- `@param` {number} ar
- `@param` {number} ag
- `@param` {number} ab
- `@param` {number} aa

### `set_hover`

`set_hover` — drive the eased hover progress (JS runs the
ease so the shader stays stateless; pump frames while the
value is moving, settle it to present the last frame).

- `@param` v Eased progress 0..1 (0 = stub arms, 1 = full span).
- `@param` {number} v

### `set_size`

`set_size` — CSS px (contract parity; unused — device px only).

- `@param` _w @param _h CSS size — unused.
- `@param` {number} _w
- `@param` {number} _h
