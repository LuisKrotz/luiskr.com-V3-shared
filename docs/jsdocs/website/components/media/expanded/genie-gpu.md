# `website/components/media/expanded/genie-gpu.ts`

WebGPU/Rust backend for the expand-modal genie warp —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/media/expanded/genie-gpu.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

The crate's wasm-bindgen surface — mirrors `rust/genie/src/lib.rs`.
Method calls on a worker-routed handle are fire-and-forget
postMessages (transferables move zero-copy); in-page mounts call the
widget directly. Either way the contract is synchronous-looking.

### `set_rects`

Pushes the warp rect pair — viewport CSS px. Always
(modal rect, figure rect) regardless of direction.

- `@param` fx @param fy @param fw @param fh The modal rect.
- `@param` tx @param ty @param tw @param th The figure rect.

### `set_flags`

Pushes the field flags — direction + which edge faces the figure.

- `@param` opening 1 while opening, 0 on the collapse.
- `@param` nearBottom 1 when the figure sits below the modal.

### `set_tint`

Pushes the accent rgba 0-1 — the untextured ghost fill reads it.

- `@param` r @param g @param b @param a Rgba channels.

### `set_progress`

Pushes the eased funnel progress — the driver owns the clock.

- `@param` p Funnel progress 0..1 (0 = modal sheet, 1 = figure funnel).

### `upload_bitmap`

Uploads the decoded media frame — callable repeatedly (the thumb
lands first, the full-res upgrade follows when it decodes).

- `@param` bitmap The decoded frame — transferred on the worker route.
- `@param` w Frame width px.
- `@param` h Frame height px.

### `frame`

One render tick — the crate repacks uniforms and draws the mesh.

- `@param` dt Frame delta seconds.
- `@returns` False when the surface is stale/lost.

### `uploadMediaTexture`

Decodes the media in the wasm worker pool and uploads the bitmap to
the crate — fire-and-forget: until the texture lands the shader
draws the accent-tinted ghost, so a slow decode never stalls the
warp. Thumb first (page-cached, decodes in a frame or two); the
full-res source follows as an upgrade.

- `@param` w The crate handle.
- `@param` el The <media-expanded> element — thumb/source/dimensions.

### `uploadSheetTexture`

Uploads the composited modal sheet as the warp texture — the whole
surface (glass panel + chrome text + media figure) funnels into the
figure, matching the 2D backend. `createImageBitmap` on the baked
canvas is a GPU-side copy (cheap, fire-and-forget); a missing/uneven
bake or a rejected raster falls back to the media-file upload.

- `@param` w The crate handle.
- `@param` el The <media-expanded> element — media fallback source.
- `@param` sheet The composited sheet from `buildGenieSheet`.

### `mountGenieGpu`

Attempts the WebGPU/Rust genie backend on the overlay canvas.
MANUAL drive — the genie driver's own eased clock owns `frame(dt)`
pacing so both backends render identical progress sequences.

- `@param` canvas The overlay canvas (device-px sized by the driver).
- `@param` el The <media-expanded> element — media source/dimensions.
- `@param` from Origin rect, viewport CSS px.
- `@param` to Destination rect, viewport CSS px.
- `@param` opening True on open, false on the collapse.
- `@param` sheet The composited modal sheet — uploaded as the warp
- `@returns` The renderer wrapping the widget handle, or null on any
