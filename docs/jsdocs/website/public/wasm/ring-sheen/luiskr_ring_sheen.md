# `website\public\wasm\ring-sheen\luiskr_ring_sheen.js`

| | |
|---|---|
| **Source** | `src/website\public\wasm\ring-sheen\luiskr_ring_sheen.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `RingSheen`

Public wasm surface — one ring canvas per tile container.

### `frame`

`frame` — advance the sweep clock, repack, draw all tiles.
- `@param` dt Frame delta in seconds.
- `@returns` false once the surface is stale/lost.
- `@param` {number} dt
- `@returns` {boolean}

### `init`

`init` — device + pipeline + the initial bind group.
- `@param` canvas The overlay canvas (positioned over the grid).
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`RingSheen::new` — un-initialized widget; `init` must follow.

### `resize`

`resize` — device px — the `res` uniform.
- `@param` w @param h Backing size in device pixels.
- `@param` {number} w
- `@param` {number} h

### `set_colors`

`set_colors` — push the live theme colors (computed style read
once per theme flip — the shader never sees CSS vars).
- `@param` er @param eg @param eb @param ea Ring edge rgba 0-1.
- `@param` ar @param ag @param ab @param aa Sheen core rgba 0-1.
- `@param` hair Hairline half-width in device px.
- `@param` {number} er
- `@param` {number} eg
- `@param` {number} eb
- `@param` {number} ea
- `@param` {number} ar
- `@param` {number} ag
- `@param` {number} ab
- `@param` {number} aa
- `@param` {number} hair

### `set_size`

`set_size` — CSS px (contract parity; unused — device px only).
- `@param` _w @param _h CSS size — unused.
- `@param` {number} _w
- `@param` {number} _h

### `set_tiles`

`set_tiles` — upload the per-tile sheet (8 f32s per tile — see
module doc). Recreates the storage buffer on growth, rebinds.
- `@param` values The flat f32 sheet (len = tiles·8).
- `@returns` The tile count adopted (0 on malformed input).
- `@param` {Float32Array} values
- `@returns` {number}
