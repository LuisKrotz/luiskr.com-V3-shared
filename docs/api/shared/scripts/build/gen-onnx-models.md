# `shared\scripts\build\gen-onnx-models.mjs`

Emits the site's tiny ONNX models into

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\gen-onnx-models.mjs`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `varint`

Encodes a varint (tag field for int64/enum fields).

### `tag`

Field header — fieldNumber << 3 | wireType.

### `bytes`

Length-delimited field (strings, bytes, messages, packed numerics).

### `vint`

Varint field (int64/enum/int32).

### `str`

UTF-8 string field.

### `packedInts`

Packed repeated int64 field (dims, pads, kernel_shape…).

### `rawF32`

Little-endian float32 payload — TensorProto.raw_data.

### `dim`

TensorShapeProto.Dim — fixed int64 dim or symbolic (dim_param).

### `shape`

TensorShapeProto from an array of dim specs.

### `tensorType`

TypeProto.Tensor — elem_type FLOAT(1) + shape.

### `valueInfo`

ValueInfoProto — input/output declaration.

### `tensor`

TensorProto initializer — float32 weights stored as raw_data.

### `attrInt`

AttributeProto — INT / INTS / STRING kinds only.

### `node`

NodeProto — op_type + input/output name lists + optional attrs.

### `opset`

OperatorSetIdProto — default domain, opset 13 (DepthToSpace CRD era).

### `graph`

GraphProto — nodes, initializers, value infos, name.

### `model`

ModelProto — ir_version 8 + producer + graph + opset import.

### `intentModel`

intent.onnx — navigation-intent scorer. Input [1,3]
[hoverNorm, speedNorm, bias]; sigmoid(w·x) → P(navigate). Weights are
the NPU-tier heuristic lifted into logit space: hover +2.2, speed −1.6,
intercept −0.6 — a slow dwelt hover lands ≈0.83, a fast flyby ≈0.35.

### `frametimeModel`

frametime.onnx — next-frame-time predictor for three.js adaptive
quality. Input [1,6]: last 5 frame times normalized to 100ms plus the
current quality level 0–1. One hidden relu layer computes a damped
exponential average + quality uplift; output ≈ predicted frame ms/100.

### `cubicTaps`

Catmull-Rom bicubic kernel weights for one 2× subpixel phase — the
four taps of the cubic filter at the given fractional offset, exactly
as a software bicubic resampler computes them.

- `@param` off Fractional sample offset (−0.25 / +0.25 for 2× phases).
- `@returns` Four filter taps for input rows {floor−1…floor+2}.

### `superresModel`

superres-2x.onnx — a real Conv + DepthToSpace 2× upscaler. Conv(3→12,
4×4, pads [1,1,2,2]) produces 3 channels × 4 subpixel phases whose
kernels are separable Catmull-Rom bicubic taps (outer product of the
vertical and horizontal phase filters); DepthToSpace(mode=CRD)
interleaves them into the 2× image. This is GPU/NPU-accelerated
bicubic super-resolution — markedly sharper than canvas drawImage
bilinear when only the low-quality source exists.

### `diagramModel`

diagram-cost.onnx — mermaid render-cost scorer for the docs viewer.
Input [1,4]: normalized [nodes, edges, nesting, selfMessages];
output is predicted raster+layout ms, used to decide whether the
diagram renders immediately or defers to idle so large graphs never
block docs interactivity. Linear model: cost ≈ 4·nodes + 6·edges +
10·nesting + 2·self + 3.

### `ORT_FILES`

ORT binaries the webgpu bundle fetches from env.wasm.wasmPaths.

### `genOnnxModels`

Writes every model under `website/public/models/` and copies the ORT
runtime binaries into `website/public/ort/` (skipping files that are
already identical). Returns the list of files written — callers log.

- `@returns` Paths (repo-relative) of emitted/copied files.
