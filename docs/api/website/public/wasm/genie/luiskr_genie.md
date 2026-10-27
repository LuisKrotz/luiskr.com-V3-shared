# `website\public\wasm\genie\luiskr_genie.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\genie\luiskr_genie.js`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Genie`

Public wasm surface — one genie transition per expand modal.

### `frame`

`frame` — repack uniforms + one render pass (the mesh draw).

- `@param` dt Frame delta in seconds.
- `@returns` false once the surface is stale/lost.
- `@param` {number} dt
- `@returns` {boolean}

### `init`

`init` — device + the mesh pipeline + the placeholder texture.

- `@param` canvas The overlay canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`Genie::new` — un-initialized widget; `init` must follow.

### `resize`

`resize` — device px — the `res` uniform + surface re-configure.

- `@param` w @param h Backing size in device pixels.
- `@param` {number} w
- `@param` {number} h

### `set_flags`

`set_flags` — direction + facing edge.

- `@param` opening 1.0 while opening, 0.0 on the collapse.
- `@param` near_bottom 1.0 when the origin sits below the destination.
- `@param` {number} opening
- `@param` {number} near_bottom

### `set_progress`

`set_progress` — the JS-owned spring progress 0..1.

- `@param` p Progress.
- `@param` {number} p

### `set_rects`

`set_rects` — the warp's origin + destination rects, CSS px.

- `@param` fx @param fy @param fw @param fh Origin rect.
- `@param` tx @param ty @param tw @param th Destination rect.
- `@param` {number} fx
- `@param` {number} fy
- `@param` {number} fw
- `@param` {number} fh
- `@param` {number} tx
- `@param` {number} ty
- `@param` {number} tw
- `@param` {number} th

### `set_size`

`set_size` — canvas CSS px (drives the dpr uniform against `dev`).

- `@param` w @param h CSS size.
- `@param` {number} w
- `@param` {number} h

### `set_tint`

`set_tint` — the accent rgba (0-1, theme-resolved in JS) the
untextured ghost fill reads.

- `@param` r @param g @param b @param a Rgba channels.
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a

### `upload_bitmap`

`upload_bitmap` — decode happened off-thread (createImageBitmap);
GPU→GPU copy into a fresh texture, then the mesh bind group is
rebuilt against it and `has_tex` goes live.

- `@param` bitmap The decoded frame.
- `@param` w @param h Bitmap pixel size.
- `@param` {ImageBitmap} bitmap
- `@param` {number} w
- `@param` {number} h
