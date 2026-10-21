# `website\components\home\about\glitch\wasm.ts`

| | |
|---|---|
| **Source** | `src/website\components\home\about\glitch\wasm.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `pushGlitchRect`

Pushes the session's cover-fit rect into the widget — device px, the
same rect the 2D painters draw through, so frag→uv mapping reproduces
`object-fit: cover` + `object-position` exactly.
- `@param` s Live session with a mounted widget + measured rect.

### `uploadGlitchBitmap`

Decodes the live portrait URL and uploads the bitmap to the widget —
routed through `decodeImageWASM` so decode happens in the worker pool
with GPU resize hints sized to the canvas's device-px box. Re-called
on srcset drift (the browser swaps density candidates under a live
session). A null bitmap or rejected upload kills the wasm arm and
claims the 2D backend instead.
- `@param` s Live session with a mounted widget.

### `tryGlitchWasm`

Async mount — tries the rust/glitch artifact on the session canvas.
On success the session's `wasm` field goes live and `tick` switches
to `frameGlitchWasm`; on ANY failure (artifact, init, decode) the
2D backend is claimed — the session stays alive either way unless
the 2D claim also fails, in which case the overlay is dropped and
the plain <img> is the final fallback.
- `@param` host The component the session is parked on.
- `@param` s Fresh session (ctx unclaimed, wasm null).

### `frameGlitchWasm`

One wasm-backend frame — mirrors the 2D `frame()` clock (same 50ms dt
clamp) so the roll-bar sweep pace matches either backend. Pushes the
hover latch per frame (single f32 uniform — cheaper than edge-detecting
it) and drops to the 2D backend if the surface reports itself stale.
- `@param` s Live session with `s.wasm` non-null.
