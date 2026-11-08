# `website\public\wasm\ring-fill\luiskr_ring_fill.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\ring-fill\luiskr_ring_fill.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `RingFill`

Public wasm surface — one ring-fill canvas per results list.

### `frame`

`frame` — advance the clock, repack, draw all tiles.

- `@param` dt Frame delta in seconds.
- `@returns` false once the surface is stale/lost.
- `@param` {number} dt
- `@returns` {boolean}

### `init`

`init` — device + pipeline + the initial bind group.

- `@param` canvas The overlay canvas (positioned over the list).
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`RingFill::new` — un-initialized widget; `init` must follow.

### `resize`

`resize` — device px — the `res` uniform.

- `@param` w @param h Backing size in device pixels.
- `@param` {number} w
- `@param` {number} h

### `set_colors`

`set_colors` — push the live theme colors (computed style read
once per theme flip — the shader never sees CSS vars).

- `@param` tr @param tg @param tb @param ta Track ring rgba 0-1.
- `@param` fr @param fg @param fb @param fa Progress arc rgba 0-1.
- `@param` hr @param hg @param hb @param ha Arc-tip dot rgba 0-1.
- `@param` hair Hairline half-width in device px.
- `@param` {number} tr
- `@param` {number} tg
- `@param` {number} tb
- `@param` {number} ta
- `@param` {number} fr
- `@param` {number} fg
- `@param` {number} fb
- `@param` {number} fa
- `@param` {number} hr
- `@param` {number} hg
- `@param` {number} hb
- `@param` {number} ha
- `@param` {number} hair

### `set_size`

`set_size` — CSS px (contract parity; unused — device px only).

- `@param` _w @param _h CSS size — unused.
- `@param` {number} _w
- `@param` {number} _h

### `set_tiles`

`set_tiles` — upload the per-button sheet (8 f32s per tile — see
module doc). Recreates the storage buffer on growth, rebinds.

- `@param` values The flat f32 sheet (len = tiles·8).
- `@returns` The tile count adopted (0 on malformed input).
- `@param` {Float32Array} values
- `@returns` {number}
