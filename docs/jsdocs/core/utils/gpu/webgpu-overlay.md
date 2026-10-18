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

### `frame`

One rAF tick; `dt` in seconds.

### `hover_group`

Group id under the pointer after the latest drain (0 = none).

### (module scope)

Live overlay handle returned by `mountWebGpuOverlay`.

### `canvas`

The mounted canvas element.

### `overlay`

The wasm Overlay instance (text staging + font installs go here).

### `hoverGroup`

Group under the pointer from the most recent frame (0 = none).

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
