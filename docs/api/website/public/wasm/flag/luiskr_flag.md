# `website\public\wasm\flag\luiskr_flag.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\flag\luiskr_flag.js`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Flag`

Public wasm surface — one flag canvas per instance.

### `frame`

`frame` — one animation tick: pack, write, draw. Skips silently
until textures land (no bind group yet — an unbound draw would
be a validation error).

- `@param` dt Seconds since the previous call.
- `@param` {number} dt

### `init`

`init` — device + pipeline + sampler; the bind group builds
once textures land (`upload_textures` → `rebind`).

- `@param` canvas The widget's dedicated canvas.
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`Flag::new` — un-initialized widget; `init` must follow.

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

`set_state` — bundled scalar update: hover amount, the locale
personality, and the split-flag geometry.

- `@param` hover 0..1 hover amount.
- `@param` anim Locale personality 0..11 (`GPU_FLAG_ANIMS`).
- `@param` is_split 0 single / 1 split flag.
- `@param` split_x Seam position 0..1.
- `@param` {number} hover
- `@param` {number} anim
- `@param` {number} is_split
- `@param` {number} split_x

### `upload_textures`

`upload_textures` — stage one or two RGBA8 flag images. Single-
flag widgets pass `rgba_b` identical to `rgba_a` (the shader
reads tex2 only when is_split=1 — a duplicate binding is the
cheapest no-op). Rebuilds the bind group so the new textures go
live next frame.

`ImageBitmap` inputs — the browser decodes the SVG off-main-
thread and `copyExternalImageToTexture` moves pixels GPU→GPU,
so no CPU pixel round-trip ever touches the flag path.

- `@param` a The primary flag's decoded bitmap.
- `@param` b The secondary flag's decoded bitmap (same as `a` for
- `@param` {ImageBitmap} a
- `@param` {ImageBitmap} b
