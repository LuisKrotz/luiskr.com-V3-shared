# `core\public\scripts\workers\gpu-render-worker.js`

| | |
|---|---|
| **Source** | `src/core\public\scripts\workers\gpu-render-worker.js` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `COPY_PITCH`

bytesPerRow alignment required by copyTextureToBuffer.

### `widgets`

Live widget records — id → { widget, canvas, manual, active, last, timer }.

### `devicePromise`

The worker's own shared GPUDevice — one device serves every canvas.

### `moduleInit`

wasm-pack `init` is not reentrant-safe: `__wbg_init` reads the
module-level `wasm` binding, then awaits instantiate — a concurrent
second call re-instantiates and swaps the heap under live widgets
(RefCell flags read garbage → 'gpu slot poisoned'). Memoize per
artifact URL so concurrent mounts share one instantiation.

### `initModule`

`initModule` — fetch + instantiate the artifact glue once per URL.

### `getDevice`

Request the worker-side device once; clears on loss so mounts re-request.

### `stop`

Stop a record's pump loop.
- `@param` rec The widget record.

### `pump`

The worker-side render pump — owns `widget.frame(dt)` for
RAF-driven kinds. A wasm-boundary throw or a false return disarms
the pump and reports `dead` so the bridge can fall back.
- `@param` rec The widget record.

### `probeFrame`

`probeFrame` — the draw-text overlay's self-verify, worker-side:
jump the stagger to end state, read the canvas texture back through
the worker's device, count painted pixels.
- `@param` rec The widget record.
- `@param` ms The probe timestamp (past the last char's end).
- `@returns` Painted coverage ratio 0..1, or -1 on any readback failure.

### `mount`

`mount` — import the artifact, instantiate the widget, init it on
the transferred OffscreenCanvas. Manual records skip the pump —
their caller paces `frame` messages itself.
