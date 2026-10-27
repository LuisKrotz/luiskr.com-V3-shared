[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/ml/ort-engine](../README.md) / mlSession

```ts
function mlSession(slug, loadModule?): Promise<OrtSessionLike | null>
```

Defined in: core/utils/ml/ort-engine.ts:187

Creates (and caches) the InferenceSession for a model slug. First
tries the full EP chain; if the accelerator session throws (e.g. a
WebNN driver rejects the graph) it retries wasm-only before giving
up — a broken NPU path must not take the model down with it.
`ML_WASM_EP_MODELS` slugs skip the accelerator chain entirely: those
interactive-path models must never issue the synchronous
pipeline-compile IPCs a webgpu/webnn session create performs, since
a busy GPU process wedges the renderer main thread.

## Parameters

### slug

`string`

Model slug from `ML.MODEL_*` — resolves to `/models/<slug>.onnx`.

### loadModule?

() => `Promise`\<[`OrtModule`](../interfaces/OrtModule.md)\>

Injectable ORT loader (forwarded to ensureOrt).

## Returns

`Promise`\<`OrtSessionLike` \| `null`\>

The session, or null when every EP failed.
