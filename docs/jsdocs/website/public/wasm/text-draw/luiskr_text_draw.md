# `website\public\wasm\text-draw\luiskr_text_draw.js`

| | |
|---|---|
| **Source** | `src/website\public\wasm\text-draw\luiskr_text_draw.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `TextDraw`

Public wasm surface — one text-draw canvas per animated block.

### `frame`

`frame` — advance the clock, repack, draw all live chars.
- `@param` dt Frame delta in seconds.
- `@returns` false once the surface is stale/lost (JS disarms).
- `@param` {number} dt
- `@returns` {boolean}

### `init`

`init` — device + pipeline + sampler; the bind group builds
once the atlas + first sheet land (`upload_atlas`/`set_chars`
→ `rebind`).
- `@param` canvas The overlay canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`TextDraw::new` — un-initialized widget; `init` must follow.

### `resize`

`resize` — device px — the `res` uniform.
- `@param` w @param h Backing size in device pixels.
- `@param` {number} w
- `@param` {number} h

### `set_chars`

`set_chars` — upload the per-char sheet (12 f32s per char —
see module doc). Recreates the storage buffer when the sheet
outgrows capacity, then rebinds.
- `@param` values The flat f32 sheet (len = count·12).
- `@returns` The char count adopted (0 on malformed input).
- `@param` {Float32Array} values
- `@returns` {number}

### `set_ink`

`set_ink` — push the text color (computed style read once).
- `@param` r @param g @param b @param a rgba 0-1.
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a

### `set_size`

`set_size` — CSS px (contract parity; unused — device px only).
- `@param` _w @param _h CSS size — unused.
- `@param` {number} _w
- `@param` {number} _h

### `trigger`

`trigger` — start the stagger: the clock's current value
becomes t0 so `frame` reports elapsed ms from HERE.

### `upload_atlas`

`upload_atlas` — stage the rasterized char atlas. `ImageBitmap`
input — `copyExternalImageToTexture` moves pixels GPU→GPU.
Rebinds so the new atlas goes live next frame.
- `@param` bitmap The decoded atlas bitmap.
- `@returns` true when the texture landed, false before init.
- `@param` {ImageBitmap} bitmap
- `@returns` {boolean}
