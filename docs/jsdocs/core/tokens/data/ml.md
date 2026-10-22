# `core\tokens\data\ml.ts`

ONNX Runtime Web / WebNN engine tokens — sole declaration

| | |
|---|---|
| **Source** | `src/core\tokens\data\ml.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `EP_WEBNN`

Execution-provider preference order — ORT picks the first live one.

### `ORT_IMPORT_SPEC`

onnxruntime-web submodule specifier for the jsep (WebGPU+WebNN) bundle.

### `ORT_LOG_LEVEL`

ORT logLevel — devNoise off, real failures still surface.

### `TENSOR_FLOAT32`

Tensor element type string ORT expects for float32 tensors.

### `MODEL_EXT`

Model file extension under the models prefix.

### `MODEL_INTENT`

Model registry — slug → file under `/models/<slug>.onnx` emitted by
`gen-onnx-models.mjs`. Keep names stable: the manifest and the
runtime bind by slug.

### `IN_FEATURES`

Input tensor name shared by every generated model.

### `SUPERRES_MAX_PIXELS`

Super-res input cap — pixel marshaling runs on the main thread so
sources stay thumb-sized (≤512² px); larger media already has the
quality it needs.

### `IN_LR_IMAGE`

Super-resolution model's image tensor names + geometry.

### `INTENT_FEATURE_DIM`

Intent model feature layout: [hoverNorm, speedNorm, bias].

### `FRAMETIME_FEATURE_DIM`

Frametime model feature layout: 5-frame window + current quality.

### `DIAGRAM_FEATURE_DIM`

Diagram-cost feature layout: [nodeCount, edgeCount, nesting, selfMsgs].

### `OUT_PROBABILITY`

Output tensor names for the generated models.

### `FRAME_NORM_MS`

Frame-time prediction normalization — inputs are clamped to
[0, FRAME_NORM_MS] then divided by it so the network sees 0–1.
100ms covers a fully dropped long task without clipping real spikes.

### `FRAMETIME_INFER_EVERY`

Inference cadence — one pass per N frames keeps ORT off the tick.

### `FRAME_BUDGET_HI`

Predicted-ms thresholds (normalized /100) that move quality.

### `QUALITY_MIN`

Quality bounds + step sizes — pixel-ratio multiplier 0.5–1.0.

### `DIAGRAM_NORM_NODES`

Diagram-cost: features normalized by these before inference.

### `DIAGRAM_DEFER_MS`

Render-time threshold (ms) above which a diagram defers to idle.

### `MIN_ES_TIER`

Minimum ES bundle tier for ML inference — the enhancements are
modern-browser-only progressive layers; the loader-stamped tier
(window.__LK_TIER) below this year never fetches the ORT chunk and
keeps the heuristic path. 'esnext' always qualifies.

### `TIER_PREFIX`

Tier-name prefix and the non-numeric newest tier name.

### `WINDOW_TIER`

Window property the ES5 browser-loader stamps with the picked tier name.

### `ML_SESSION`

ORT session-option literal names — the `executionProviders` array and
`graphOptimizationLevel` enum value live here so no string is repeated
between the engine and its tests.

### `WEBNN_DEVICE`

WebNN deviceType hint passed to the EP — matches npu-predict's probe.
