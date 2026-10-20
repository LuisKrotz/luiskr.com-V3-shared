# `website/public/wasm/skeleton/luiskr_skeleton.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/public/wasm/skeleton/luiskr_skeleton.js`   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Skeleton`

Public wasm surface — one skeleton canvas per instance. A page may
mount several (hero + content areas shimmer independently).

### `frame`

`frame` — one animation tick. Per-frame cost: one ~64 B uniform
write + one pass + one 3-vertex draw. The fragment loop early-
outs per rect — bounded and cheap.

- `@param` dt Seconds since the previous `frame` call.
- `@param` {number} dt

### `init`

`init` — acquire adapter/device, configure the canvas, compile
the pipeline, allocate the uniform + sheet buffers. Rejection
propagates to JS, which falls back to the WebGL/CSS skeleton.

- `@param` canvas The dedicated canvas this surface paints.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a configured surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`Skeleton::new` — un-initialized surface; `init` must follow.
Split because the device request is an async browser promise.

### `resize`

`resize` — re-configure the surface after a canvas-bitmap
change + store the DEVICE-pixel size as the shader's `rect`
(the whole-canvas clip, in `frag`'s device units).

- `@param` w Device-pixel width (element CSS px × DPR).
- `@param` h Device-pixel height.
- `@param` {number} w
- `@param` {number} h

### `set_size`

`set_size` — the canvas's CSS-pixel size. Feeds the shader's
`res` field (the widget rect IS the whole canvas — device-px
`rect` is written by `resize` instead).

- `@param` w Canvas width in CSS pixels.
- `@param` h Canvas height in CSS pixels.
- `@param` {number} w
- `@param` {number} h

### `set_state`

`set_state` — scalar updates bundled to keep the JS call count
low: resolve progress, ink alpha, live rect count.

- `@param` resolve 0..1 resolve progress (collapse+fade driver).
- `@param` ink_alpha Global glyph opacity multiplier.
- `@param` count Live rect count, clamped to MAX_RECTS.
- `@param` {number} resolve
- `@param` {number} ink_alpha
- `@param` {number} count

### `write_sheet`

`write_sheet` — upload the per-rect data block: 16 f32s per
rect — [x,y,w,h][radius,cell,row_h,unused][sbase rgb,unused]
[sink rgb,unused]. Truncated at MAX_RECTS rows; `count` (set
via `set_state`) decides how many rows the GPU reads.

- `@param` values Flat f32 sheet — 16 values per rect row.
- `@param` {Float32Array} values
