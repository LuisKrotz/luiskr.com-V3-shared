[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/ml](../README.md) / ML

```ts
const ML: Readonly<{
  EP_WEBNN: 'webnn'
  EP_WEBGPU: 'webgpu'
  EP_WASM: 'wasm'
  ORT_IMPORT_SPEC: 'onnxruntime-web/webgpu'
  ORT_LOG_LEVEL: 'warning'
  TENSOR_FLOAT32: 'float32'
  MODEL_EXT: '.onnx'
  MODEL_INTENT: 'intent'
  MODEL_FRAMETIME: 'frametime'
  MODEL_SUPERRES: 'superres-2x'
  MODEL_DIAGRAM: 'diagram-cost'
  IN_FEATURES: 'features'
  SUPERRES_MAX_PIXELS: 262144
  IN_LR_IMAGE: 'lr'
  OUT_HR_IMAGE: 'hr'
  SUPERRES_SCALE: 2
  INTENT_FEATURE_DIM: 3
  FRAMETIME_FEATURE_DIM: 6
  FRAMETIME_HISTORY: 5
  DIAGRAM_FEATURE_DIM: 4
  OUT_PROBABILITY: 'prob'
  OUT_MS: 'ms'
  OUT_COST: 'cost'
  FRAME_NORM_MS: 100
  FRAMETIME_INFER_EVERY: 30
  FRAME_BUDGET_HI: 0.17
  FRAME_BUDGET_LO: 0.12
  QUALITY_MIN: 0.5
  QUALITY_STEP_DOWN: 0.15
  QUALITY_STEP_UP: 0.05
  DIAGRAM_NORM_NODES: 64
  DIAGRAM_NORM_EDGES: 96
  DIAGRAM_NORM_NEST: 4
  DIAGRAM_NORM_SELF: 8
  DIAGRAM_DEFER_MS: 24
  MIN_ES_TIER: 2025
  TIER_PREFIX: 'es'
  TIER_ESNEXT: 'esnext'
  WINDOW_TIER: '__LK_TIER'
}>
```

Defined in: core/tokens/data/ml.ts:15

Machine-learning runtime tokens — model registry, ONNX tensor names,
execution-provider preference strings, and the input-feature layouts
shared by the generator (`shared/scripts/build/gen-onnx-models.mjs`)
and the runtime feeders (`core/utils/ml/`). Object.freeze makes the
contract immutable; consumers never redeclare the literals.
