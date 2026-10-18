# `website/public/wasm/overlay/luiskr_overlay.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/public/wasm/overlay/luiskr_overlay.js`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Overlay`

Public wasm surface. `RefCell` interior-mutates around wasm-bindgen's
`&self`/`&mut self` exports without JS-visible ceremony.

### `burn_set_colors`

Burn sim data: four ink tints [core, mid, edge, scorch] × rgba.

- `@param` {number} id
- `@param` {Float32Array} flat

### `burn_set_dir`

Burn sim direction: +1 burn, −1 rebuild (un-hover replay).

- `@param` {number} id
- `@param` {number} dir

### `burn_set_ink`

Burn sim data: per-column ink occupancy bytes.

- `@param` {number} id
- `@param` {Uint8Array} ink

### `burn_set_letters`

Burn sim data: letter table (f32×6 per letter).

- `@param` {number} id
- `@param` {Float32Array} flat

### `burn_set_stage`

Burn sim stage — pushed per frame before `frame`: global progress
0..1 + jagged-edge amplitude in device px.

- `@param` {number} id
- `@param` {number} stage
- `@param` {number} jag_amp

### `frame`

One frame — the only per-tick entry point, and the whole reason
the architecture works. Five stages, each chosen to cost the
minimum the hardware allows:

1. **Drain input** — replay every queued event once. Hover is
   recomputed only on move/down (up and wheel don't change what's
   under the pointer — skipping their hit_tests is a deliberate
   cost cut).
2. **Tick sims** — burn particles advance in dt-space and emit
   quads into the shared buffer (one instanced draw covers ALL
   particles of ALL widgets).
3. **Upload** — ONE `write_buffer` memcpy per frame; the instance
   buffer is grown geometrically (`next_power_of_two`) so steady
   frames never recreate it — allocation-free like the Vecs.
4. **Encode** — clear once, then: quad pass → per-widget scissored
   draws (paint order = rect.y sort, mirroring DOM order) → text.
   One encoder, one render pass — state changes between widgets
   are pipeline+bind swaps, cheap driver commands.
5. **Present** — mailbox mode drops stale frames rather than
   queueing latency.

`dt` is in SECONDS — see the module doc's dt-space note.

- `@param` {number} dt

### `hover_group`

The group under the pointer from the latest drain — the bridge
reads it after `frame` to route click intents to the DOM router.

- `@returns` {number}

### `init`

Request adapter/device and configure the canvas surface. Called
once from the bridge; failure propagates so the bridge falls back
to DOM rendering.

- `@param` {HTMLCanvasElement} canvas
- `@returns` {Promise<void>}

### `input_buffer_ptr`

Pointer to the f32 input ring — JS writes records directly into
wasm linear memory here. No copy, no call per event.

- `@returns` {number}

### `input_meta_ptr`

Pointer to the [head, tail] i32 meta pair — JS bumps head after
each record write, Rust drains from tail during `frame`.

- `@returns` {number}

### `install_font`

Loads a route font (Raleway/Fira bytes) into the glyphon font db.

- `@param` {string} family
- `@param` {Uint8Array} bytes

### `constructor`

Constructs an un-initialized overlay — `init` must follow before
`frame`. Split because wgpu init is async on wasm32.

### `push_video_frame`

Pushes a decoded video frame (WebCodecs → RGBA) into a media
widget's texture — the video hot path: one write_texture, no
bind-group rebuild, size changes recreate the slot.

- `@param` {number} id
- `@param` {Uint8Array} rgba
- `@param` {number} w
- `@param` {number} h

### `register_media`

Registers a media widget rect — media quads draw through the
textured pipeline; the id is shared with the slot table above.
Same signature family as `register_widget` but no kind — media
widgets are always textured quads.

- `@param` {number} x
- `@param` {number} y
- `@param` {number} w
- `@param` {number} h
- `@returns` {number}

### `register_widget`

Registers a widget region on the overlay. `kind` is a
`widgets::kinds` discriminant; the rect is canvas CSS px. Returns
a stable id for state pushes + teardown, 0 when the kind is
unknown or the GPU isn't live (bridge keeps its DOM fallback).

- `@param` {number} kind
- `@param` {number} x
- `@param` {number} y
- `@param` {number} w
- `@param` {number} h
- `@returns` {number}

### `resize`

Reconfigures the surface + text viewport after a canvas resize.
`scale` is devicePixelRatio — text jobs stay in CSS px, glyphon
rasterizes at device px so glyphs stay crisp at 120Hz+.

- `@param` {number} w
- `@param` {number} h

### `set_css_size`

Tells the overlay the canvas's CSS size — the bridge calls this
alongside `resize(device px)` so scissor math can convert widget
rects (CSS px) into surface pixels.

- `@param` {number} w
- `@param` {number} h

### `set_text`

Registers/replaces a mirrored text node. Called on DOM content
change — not per frame. `id` is the bridge's stable slot for the
DOM node; re-calling with an existing id updates in place.

- `@param` {number} id
- `@param` {string} text
- `@param` {number} x
- `@param` {number} y
- `@param` {number} size
- `@param` {number} max_width_px
- `@param` {string} family
- `@param` {number} r
- `@param` {number} g
- `@param` {number} b
- `@param` {number} a
- `@param` {number} bl
- `@param` {number} bt
- `@param` {number} br
- `@param` {number} bb

### `set_widget_rect`

Moves/resizes a widget region — the bridge calls this when the
DOM rect it mirrors moves (layout shift, resize, scroll of the
containing surface). The widget's own `res` uniform updates too
so shaders keep their original px-space math.

- `@param` {number} id
- `@param` {number} x
- `@param` {number} y
- `@param` {number} w
- `@param` {number} h

### `set_widget_uniform`

Writes the widget's uniform block — raw f32s in the layout the
widget's `*.rs` documents. Called per state change (per frame for
time/progress, once per event for ripple/click stamps).

- `@param` {number} id
- `@param` {Float32Array} values

### `unregister_widget`

Removes a widget — GPU resources drop with the handle.

- `@param` {number} id

### `upload_flag_textures`

Uploads both flag textures (RGBA8) and finishes the flag bind
group. `tex2` may repeat `tex1` for non-split flags.

- `@param` {number} id
- `@param` {Uint8Array} rgba_a
- `@param` {number} w_a
- `@param` {number} h_a
- `@param` {Uint8Array} rgba_b
- `@param` {number} w_b
- `@param` {number} h_b

### `upload_media_image`

Decodes an image (jpeg/png/webp) in Rust and binds it to a media
widget — decode runs in wasm, off the main thread, no
createImageBitmap round trip. Returns false on decode failure so
the bridge keeps the DOM <img> (manifest-gated fallback).

- `@param` {number} id
- `@param` {Uint8Array} bytes
- `@returns` {boolean}

### `write_skel_sheet`

Writes the skeleton sheet — the per-rect vec4 fields the shader
loops (rects/meta/sbase/sink, `skeleton::RECT_FIELDS` per rect).

- `@param` {number} id
- `@param` {Float32Array} values
