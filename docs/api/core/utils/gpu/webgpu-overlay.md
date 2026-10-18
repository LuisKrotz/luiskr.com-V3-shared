# `core/utils/gpu/webgpu-overlay.ts`

JS→wasm bridge for the `rust/overlay` WebGPU surface — the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/utils/gpu/webgpu-overlay.ts`                    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `INPUT_TYPES`

Input discriminants written into the ring — mirrors `kinds` in
`rust/overlay/src/input.rs`; bump both together.

### `RING_CAP`

Ring capacity in records — mirrors RING_CAP in input.rs.

### `RECORD_F32S`

f32s per record — [type, x, y, payload].

### `RING_F32S`

Total f32 slots in the ring.

### `OVERLAY_GLUE_URL`

wasm-pack `--target web` glue module path under public/.

### (module scope)

What the generated glue exposes (loose — the crate may not exist yet).

### `default`

Async initializer returning the wasm exports (includes `.memory`).

### `Overlay`

The exported wasm class.

### (module scope)

Public surface of the wasm `Overlay` — keep in sync with lib.rs.

### `input_buffer_ptr`

f32 ring base pointer inside wasm memory.

### `input_meta_ptr`

[head, tail] i32 pair pointer inside wasm memory.

### `init`

Async wgpu init on the canvas.

### `resize`

Surface resize in device px.

### `set_css_size`

Canvas CSS size — scissor math needs CSS↔device scale.

### `frame`

One rAF tick; `dt` in seconds.

### `hover_group`

Group id under the pointer after the latest drain (0 = none).

### `register_widget`

Registers a shader widget region; 0 = unavailable/unknown kind.

### `register_media`

Registers a media (textured-quad) widget region.

### `set_widget_rect`

Moves/resizes a widget region (canvas CSS px).

### `set_widget_uniform`

Writes a widget's uniform block (f32 layout per its .rs doc).

### `unregister_widget`

Removes a widget + its GPU resources.

### `upload_flag_textures`

Stages both flag textures and completes the flag bind group.

### `write_skel_sheet`

Writes the skeleton per-rect sheet (vec4 fields × rects).

### `upload_media_image`

Rust-decodes an image onto a media widget; false = keep DOM img.

### `push_video_frame`

Streams a WebCodecs-decoded RGBA frame into a media widget.

### `burn_set_letters`

Burn sim: letter table (f32×6 per letter).

### `burn_set_ink`

Burn sim: per-column ink occupancy bytes.

### `burn_set_colors`

Burn sim: four ink tints [core, mid, edge, scorch] × rgba.

### `burn_set_dir`

Burn sim: +1 burn, −1 rebuild.

### `burn_set_stage`

Burn sim: per-frame stage + jagged amplitude.

### (module scope)

Canvas-space CSS px rect — the unit every widget registration uses.

### `x`

Left edge, CSS px.

### `y`

Top edge, CSS px.

### `width`

Width, CSS px.

### `height`

Height, CSS px.

### (module scope)

Live overlay handle returned by `mountWebGpuOverlay`.

### `canvas`

The mounted canvas element.

### `overlay`

The wasm Overlay instance (text staging + font installs go here).

### `hoverGroup`

Group under the pointer from the most recent frame (0 = none).

### `registerWidget`

Registers a shader widget (GPU_WIDGET_KINDS) on a canvas-space rect;
returns the widget id or 0 — callers keep their DOM/WebGL paint on 0.

### `registerMedia`

Registers a media rect — pairs with uploadMediaImage/pushVideoFrame.

### `setWidgetRect`

Moves a widget's rect — call on layout shifts/resize.

### `setWidgetUniform`

Pushes a widget's uniform block (f32 layout per widget doc).

### `unregisterWidget`

Removes a widget.

### `uploadFlagTextures`

Stages the flag widget's two textures (RGBA8 + sizes).

### `writeSkelSheet`

Writes the skeleton widget's per-rect sheet.

### `uploadMediaImage`

Decodes an image onto a media widget; false = keep the DOM img.

### `pushVideoFrame`

Streams a WebCodecs RGBA frame into a media widget.

### `burnSetLetters`

Burn: letter table (f32×6 per letter).

### `burnSetInk`

Burn: per-column ink occupancy.

### `burnSetColors`

Burn: [core, mid, edge, scorch] tints × rgba.

### `burnSetDir`

Burn: +1 burn, −1 rebuild.

### `burnSetStage`

Burn: per-frame stage + jagged amplitude.

### `destroy`

Tears down listeners, the rAF loop, and the canvas.

### `hasWebGpu`

Capability gate — `navigator.gpu` is the WebGPU entry point. Separate
from mount so callers can decide without touching the DOM.

### (module scope)

Default module loader — dynamic-imports the wasm-pack glue from
`/wasm/overlay/`. `/* @vite-ignore *` keeps vite from trying to resolve
the (build-optional) artifact at bundle time; a 404/missing artifact
rejects and the caller falls back. Injectable for tests.

### (module scope)

Mounts the overlay canvas + wasm surface on `parent`, wires the
zero-copy input ring, and starts the rAF frame loop. Resolves to a
handle, or null when WebGPU/the artifact is unavailable — the DOM
remains the authoritative render and interaction layer either way.

- `@param` parent Element the canvas is appended to (usually document.body).
- `@param` loadModule Injectable module loader (tests substitute a stub).

### `wire`

Attaches the input pump + frame loop to a live wasm surface. Separate
from mount so the ring plumbing stays unit-testable without a real GPU.

- `@param` overlay Live wasm Overlay instance.
- `@param` canvas Mounted canvas the surface draws into.
- `@param` memory The module's WebAssembly.Memory (ring + meta live inside).
