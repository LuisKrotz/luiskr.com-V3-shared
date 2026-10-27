[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/ml](../README.md) / ML\_WASM\_EP\_MODELS

```ts
const ML_WASM_EP_MODELS: ReadonlySet<string>
```

Defined in: core/tokens/data/ml.ts:107

Slugs pinned to the wasm EP — the interaction-path models (frametime
every 30 frames, diagram-cost mid-render). ORT's webgpu/webnn session
create issues synchronous pipeline-compile IPCs that can deadlock the
renderer main thread while the GPU process is busy (scene shader
compiles) — observed as a full-page freeze on docs routes with
mermaid blocks and on weak Android GPUs. These models are
single-layer MLPs: wasm answers in microseconds, so the accelerator
EPs buy nothing and only add contention. Larger/idle-time models
(intent, superres) keep the full webnn → webgpu → wasm chain.
