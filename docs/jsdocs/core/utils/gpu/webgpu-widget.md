# `core\utils\gpu\webgpu-widget.ts`

Per-widget WebGPU/Rust bridge — the loader for the

| | |
|---|---|
| **Source** | `src/core\utils\gpu\webgpu-widget.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

The generated wasm-pack glue module shape. Each crate exports a
differently-named widget class, so the registry carries the class
name and the module is indexed dynamically.

### `default`

Async initializer returning the wasm exports (includes memory).

### (module scope)

The crate's widget class — indexed by `GPU_WIDGET_ARTIFACTS[kind].cls`.

### (module scope)

Public surface every widget crate shares (`init`/`resize`/`frame`
are the contract; `set_size`/`set_state`/`tap`/`click`/
`upload_textures`/`write_sheet`/`begin`/`set_letters`/`upload_bitmap`
etc. are kind-specific and reached through `handle.widget`).

### `init`

Async init on the widget's canvas, bound to the shared device.

### `resize`

Surface re-configure after a bitmap resize (device px).

### `set_size`

Canvas CSS size — feeds the shader's res/rect uniforms.

### `frame`

One rAF tick; `dt` in seconds. Returns false when the surface is
stale/lost (the caller disarms its loop); the wasm-pack signature
declares `boolean | undefined`, so callers must tolerate undefined.

### (module scope)

wasm-bindgen `free()` — drops the boxed struct AND unregisters the
FinalizationRegistry entry, so the object never re-enters
`__wbg_*_free` at GC time (the registry path is where a stale
glue/wasm pair traps `memory access out of bounds` — the glue's
free shim walks the struct layout compiled into ITS wasm, and a
hot-swapped artifact pair makes that read land off the heap).
Destroy calls it so the free happens deterministically while the
artifact pair that built the object is still the live one.

### (module scope)

Kind-specific setters — see each crate's lib.rs exports.

### (module scope)

Live widget handle returned by `mountWebGpuWidget`.

### `canvas`

The canvas the widget draws into (the caller's element).

### `widget`

The wasm widget instance — kind-specific methods
(`set_state`, `tap`, `click`, `upload_textures`, `write_sheet`,
`begin`, `set_letters`, `set_ink`, `set_colors`, `set_dir`,
`set_stage`, `set_origin`, `upload_bitmap`, `push_frame`,
`set_uv_rect`, `set_dark`) are called directly on it.

### `destroy`

Tears down the rAF loop + listeners (the canvas is caller-owned).

### (module scope)

Worker-routed probes — renders an end-state frame and reports the
painted-pixel coverage ratio of the live canvas. Present only on
worker-backed handles (main-thread mounts keep the readback in the
caller); returns null on failure.

### `hasWebGpu`

Capability gate — `navigator.gpu` is the WebGPU entry point.
Separate from mount so callers can decide without touching the DOM.

### `webgpuWidgetsEnabled`

`webgpuWidgetsEnabled` — the layer kill-switch. The WebGPU widget
mounts (worker `OffscreenCanvas` route OR in-page) only run under
`?debug=webgpuWidgets:active`; every other state keeps the proven
WebGL/CSS renderers authoritative. Re-parsed per call so tests and
debug toggles flip without a reload.
- `@returns` True when the WebGPU widget layer may mount.

### `sharedDevice`

The page's single GPUDevice. Every widget artifact takes the SAME
device object — WebGPU is designed for one device serving many
canvases — because per-widget devices exhaust the driver: on
Windows/D3D12 a busy page hit `create command queue failed with
E_OUTOFMEMORY` after ~100 device creations, every subsequent
requestDevice resolved a broken/undefined handle, and widget init
trapped in the wasm future. One shared request keeps a full page of
widgets inside any driver's device budget.

### `sharedFor`

The `navigator.gpu` object the cached request was issued against — a
 different handle (test double, re-exposed API) re-requests.

### `getSharedGpuDevice`

`getSharedGpuDevice` — request the adapter+device once and cache
the promise so concurrent mounts share one acquisition. Keyed on
the `navigator.gpu` object itself: swapping the handle re-requests.
Resolves null on any failure (no adapter, rejected device request,
undefined device) — every caller falls back to its WebGL/CSS path.
A device that later goes lost clears the cache so the next mount
re-requests cleanly.
- `@returns` The shared GPUDevice, or null when WebGPU is unusable.

### (module scope)

Mount options — `drive` selects the clock owner; see
`GPU_WIDGET_DRIVE` for the semantics of each mode.

### (module scope)

`GPU_WIDGET_DRIVE` member; defaults to RAF.

### (module scope)

Default module loader — dynamic-imports the wasm-pack glue at
`/wasm/<slug>/<pkg>.js` (see `GPU_WIDGET_ARTIFACTS`). `@vite-ignore`
keeps vite from resolving build-optional artifacts; a 404 rejects
and the caller falls back. Injectable for tests.
- `@param` url Artifact glue URL.

### `moduleInitOnce`

wasm-pack `init` is NOT reentrant-safe — `__wbg_init` checks the
module-level `wasm` binding, then awaits instantiate: a second
concurrent call before that lands re-instantiates and REPLACES the
heap — widgets built through the older instance then run methods on
the newer one's memory (RefCell flags read as garbage →
`try_borrow_mut` fails → 'gpu slot poisoned', or state reads as
zeros → a valid draw that paints nothing). Memoize the promise per
module object so concurrent mounts share ONE instantiation.

### `initModule`

`initModule` — the concurrency-safe wrapper around wasm-pack's
`mod.default()`: the first caller's promise is the single
instantiation; later callers join it.
- `@param` mod The loaded artifact glue module.
- `@returns` The shared instantiation promise.

### `warmWidgetArtifacts`

Fire-and-forget fetch+compile for every `eager` artifact in the
registry — currently just the skeleton, the loading placeholder
itself. Calling this at the first skeleton mount starts the
artifact fetch before `init` would, so the widget is ready the
moment its canvas needs it; failures are swallowed because mount
re-attempts and falls back anyway.
- `@param` loadModule Injectable module loader (tests substitute a stub).

### (module scope)

Mounts a widget artifact on `canvas`: loads its wasm module, calls
`init`, wires resize + visibility-paused rAF, and returns the live
handle. Resolves null on any capability/artifact/init failure — the
caller's WebGL/CSS renderer stays the render path.
- `@param` kind `GPU_WIDGET_KINDS` discriminant.
- `@param` canvas The widget's dedicated canvas element.
- `@param` loadModule Injectable module loader (tests substitute a stub).
- `@param` options Mount options — `GPU_WIDGET_DRIVE.MANUAL` leaves the

### `initQueue`

Widget-init serialization chain — each mount awaits the previous
init's release, so the load-time mount burst pipelines instead of
stacking inside one task.

### `taskYield`

One macrotask boundary — `setTimeout(0)` via Promise; yields to
input/rAF between consecutive widget inits. Kept as a named helper
so the queue line stays a single expression and tests can stub the
boundary if needed.
- `@returns` A promise resolving on the next task.

### `withTimeout`

`withTimeout` — bounds a promise: resolves its value when it lands in
time, rejects otherwise. Used on the two unbounded GPU awaits —
adapter/device requests and widget init — where a wedged driver or a
dead device leaves the promise pending forever, which would latch
the caller's mount-in-flight flag and starve its WebGL/CSS fallback.
- `@param` p The promise to bound.
- `@param` ms Deadline in milliseconds.
- `@returns` The bounded promise.

### `wire`

Attaches the rAF clock + resize/visibility plumbing to a live wasm
widget. Separate from mount so the loop stays unit-testable without
a real GPU. `dt` is seconds; the loop self-stops on destroy and
skips frames while the tab is hidden (frame-budget rule). In
`manual` mode none of that attaches — the caller's own loop calls
`widget.frame`, `widget.set_size`, and `widget.resize`, so there is
exactly one clock and one resize observer per widget.
- `@param` widget Live wasm widget instance.
- `@param` canvas The widget's canvas element.
- `@param` manual True to skip the rAF clock + listeners entirely.

### `freeWidget`

`freeWidget` — the deterministic counterpart of the
FinalizationRegistry: calls the wasm-bindgen `free()` so the boxed
struct is dropped now, under the artifact pair that created it,
instead of at an arbitrary GC point (possibly after vite hot-swapped
the glue — the `__wbg_*_free` shim then walks a stale layout and
traps `memory access out of bounds` as an unhandled rejection from
inside the registry callback, which no caller can catch). A corrupt
free is contained here — the widget is already dead either way.
- `@param` widget The live (or init-failed) wasm widget to release.

### (module scope)

The worker's artifact spec — the registry entry's wire shape.

### `url`

Glue module URL — `/wasm/<slug>/<pkg>.js`.

### `cls`

Exported widget class name inside that module.

### `WORKER_PROBE_TIMEOUT_MS`

Capability handshake timeout — a dead worker script never acks.

### `GPU_DEVICE_TIMEOUT_MS`

Bound on `requestAdapter`/`requestDevice` — a wedged GPU process
leaves these pending forever; normal adapters answer in tens of ms,
so two seconds only trips on a genuinely broken stack.

### `WIDGET_INIT_TIMEOUT_MS`

Bound on a widget's `init(canvas, device)` — pipeline compile on a
healthy device finishes in well under a second; a dead/broken device
traps the wasm future permanently (the E_OUTOFMEMORY case).

### `renderWorker`

The live render worker — set once the probe acks.

### `workerProbe`

One-shot capability probe latch.

### `pendingProbeAck`

Probe ack resolver while the handshake is in flight.

### `pendingMounts`

Mount ack resolvers — widget id → resolve(success).

### `pendingCalls`

Async call/probe reply resolvers — replyId → resolve(result).

### `deadWatchers`

Widget death watchers — id → callback when the worker reports dead.

### `workerWidgetSeq`

Monotonic widget id — correlates worker records to proxies.

### `workerCallSeq`

Monotonic reply id for call/probe round trips.

### `dispatchWorkerMessage`

`dispatchWorkerMessage` — the single onmessage router for the
render worker: mount acks, call/probe replies, and death notices.
- `@param` e The worker message event.

### (module scope)

`spawnRenderWorker` — create the worker and handshake it. The probe
decides once whether this browser can render widgets in a worker —
module workers + OffscreenCanvas + worker `navigator.gpu`; anything
less routes every mount in-page permanently.
- `@returns` True when the worker answered the probe as capable.

### `getRenderWorker`

`getRenderWorker` — the capability gate for the worker route:
resolves the live worker, or null when the browser can't run it.
- `@returns` The render worker or null.

### `destroyRenderWorker`

`destroyRenderWorker` — tears the render worker down for page unload
and vite HMR dispose: terminates the thread, flushes every pending
mount/call resolver (the map wrappers clear their own timers), fires
death watchers so proxies report dead, and latches the capability off
so nothing respawns inside a dying realm. Without this hook an HMR
module re-eval orphans the worker — its per-widget pump timers keep
the thread (and its browser process slot) alive forever.

### (module scope)

`mountViaWorker` — attempt the off-main-thread mount: transfer the
canvas to the render worker, wait for the artifact to init there,
and wire a message-forwarding handle. Returns:
  - `{handle}` on success;
  - `{canvas}` when the transfer happened but the worker mount
    failed — the element is dead (placeholder mode, no context can
    ever attach), so it is marked in place and the caller's own
    fallback path takes over;
  - `null` when the worker can't run at all (probe failed or the
    canvas was already transferred).
- `@param` spec The artifact registry entry.
- `@param` canvas The widget's canvas element.
- `@param` manual Drive mode — manual widgets pace `frame` messages from
