# `core\utils\ml\ort-engine.ts`

Lazy ONNX Runtime Web engine — the single entry point

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\ml\ort-engine.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Minimal ORT tensor surface this engine creates and reads back.

### `data`

Backing buffer — float32 for every model this project ships.

### (module scope)

Minimal InferenceSession surface used by the engine.

### `run`

Executes one inference pass; resolves the output-name → tensor map.

### (module scope)

Minimal ORT module surface — the parts of `onnxruntime-web` in use.

### `InferenceSession`

Session factory.

### `Tensor`

Tensor constructor — (type, data, dims).

### `env`

Runtime env — wasmPaths points ORT at `/ort/`.

### (module scope)

WebNN probe surface — `navigator.ml` presence gates the 'webnn' EP.

### (module scope)

Loader-stamped ES tier surface — `browser-loader.js` writes `window.__LK_TIER`.

### (module scope)

Feeds entry — raw data + dims; the engine wraps it in an ort Tensor.

### (module scope)

Named output buffers from one inference pass (or null on failure).

### `ortModule`

Cached runtime module promise — one dynamic import for the session.

### `sessionCache`

Model slug → live session promise; sessions are created at most once.

### `defaultOrtLoader`

Default ORT loader — dynamic-imports the jsep bundle (`webgpu` +
`webnn` + `wasm` EPs). Vite code-splits it into a lazy chunk; the
specifier is a token-level constant for jest module mocking.

- `@returns` The onnxruntime-web module namespace.

### `mlTierAllowed`

Modern-tier gate — ML inference is a progressive enhancement reserved
for es2025+ bundles. The loader stamps `window.__LK_TIER` with the
picked tier name ('esnext' always qualifies; `es<year>` qualifies at
`ML.MIN_ES_TIER` and up). When the stamp is absent (dev server,
prerender, tests) ML stays allowed — the EP capability probes remain
the real gate. A stamped older tier returns false so the ~1MB ORT
chunk is never fetched and callers keep their heuristic paths with
zero polyfills.

- `@returns` true when ML inference may run on this browser tier.

### `ensureOrt`

Lazily imports and configures the ORT runtime — wasm binary paths,
single wasm thread (the models are tiny; the proxy worker isn't worth
a thread slot), and warning-level logging. Concurrent callers share
the first attempt; a rejected load clears the latch so a transient
failure doesn't permanently disable ML for the session.

- `@param` loadModule Injectable loader — tests substitute a stub module.
- `@returns` The configured ORT module, or null when unavailable.

### `executionProviders`

Builds the execution-provider list for this device: `webnn` only when
`navigator.ml` exists, `webgpu` only when `navigator.gpu` exists, and
`wasm` always last so an unsupported accelerator can't block a session.

- `@returns` EP names in preference order.

### `mlSession`

Creates (and caches) the InferenceSession for a model slug. First
tries the full EP chain; if the accelerator session throws (e.g. a
WebNN driver rejects the graph) it retries wasm-only before giving
up — a broken NPU path must not take the model down with it.
`ML_WASM_EP_MODELS` slugs skip the accelerator chain entirely: those
interactive-path models must never issue the synchronous
pipeline-compile IPCs a webgpu/webnn session create performs, since
a busy GPU process wedges the renderer main thread.

- `@param` slug Model slug from `ML.MODEL_*` — resolves to `/models/<slug>.onnx`.
- `@param` loadModule Injectable ORT loader (forwarded to ensureOrt).
- `@returns` The session, or null when every EP failed.

### `runMlModel`

Runs one inference pass: wraps each feed in an ORT tensor, executes
the session, and unwraps the outputs into plain Float32Arrays.

- `@param` slug Model slug — session is lazily created on first use.
- `@param` feeds Input-name → {data,dims} map.
- `@param` loadModule Injectable ORT loader — tests substitute a stub.
- `@returns` Output-name → Float32Array, or null on any failure.

### `resetMlEngine`

Test/HMR teardown — drops cached sessions and the module latch so a
fresh realm re-probes hardware instead of inheriting stale sessions.
