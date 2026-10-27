# `website\public\wasm\media\luiskr_media.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\media\luiskr_media.js`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Media`

Public wasm surface — one media canvas per instance.

### `frame`

`frame` — draw the current texture. No clock needed (static
until an upload lands); the bridge calls this on resize/scroll
or per rAF — drawing costs one 6-vertex call.

- `@param` _dt Seconds since last call (unused — media is static
- `@param` {number} _dt

### `init`

`init` — device + pipeline + sampler; the bind group builds on
the first upload.

- `@param` canvas The widget's dedicated canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`Media::new` — un-initialized widget; `init` must follow.

### `push_frame`

`push_frame` — stream a WebCodecs `VideoFrame` into the texture.
Same GPU→GPU path as bitmaps — video frames upload per
requestVideoFrameCallback, NOT per rAF.

- `@param` frame The decoded frame.
- `@param` w Frame width px.
- `@param` h Frame height px.
- `@param` {VideoFrame} frame
- `@param` {number} w
- `@param` {number} h

### `resize`

`resize` — canvas-bitmap change → surface re-configure. The
projection is pure CSS px (`rect`/`viewport` — see State doc),
so no size state updates here.

- `@param` _w Device-pixel width (element-side; unused — see doc).
- `@param` _h Device-pixel height.
- `@param` {number} _w
- `@param` {number} _h

### `set_size`

`set_size` — the canvas's CSS-pixel size (rect + viewport).

- `@param` w Canvas width in CSS pixels.
- `@param` h Canvas height in CSS pixels.
- `@param` {number} w
- `@param` {number} h

### `set_uv_rect`

`set_uv_rect` — the cover-fit crop window: which sub-rect of
the texture maps onto the widget. JS computes the aspect math
(single responsibility — the shader just samples it).

- `@param` u Crop window left edge, 0..1.
- `@param` v Crop window top edge, 0..1.
- `@param` du Crop window width, 0..1.
- `@param` dv Crop window height, 0..1.
- `@param` {number} u
- `@param` {number} v
- `@param` {number} du
- `@param` {number} dv

### `upload_bitmap`

`upload_bitmap` — paint a decoded `ImageBitmap` (JS did the
decode off-main-thread via createImageBitmap). GPU→GPU copy —
the fastest possible path and zero wasm-side decode code.

- `@param` bitmap The decoded image.
- `@param` w Bitmap width px.
- `@param` h Bitmap height px.
- `@param` {ImageBitmap} bitmap
- `@param` {number} w
- `@param` {number} h
