# `core\utils\canvas\glsl.ts`

Shared GLSL chunk library for the canvas widget/loader

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\glsl.ts`                           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `GLSL_VS_QUAD_UV`

Quad→UV vertex stage — `a_pos` −1..1 → `v_uv` 0..1, unflipped.

### `GLSL_VS_QUAD_UV_FLIP`

Quad→UV vertex stage with vertically flipped UVs — the media-upload
blit inverts Y so DOM-source textures land right-side up. Uses the
`a_position` attribute name the GPUAccelerator binds.

### `GLSL_FS_PRECISION_AUTO`

Fragment-precision auto preamble — highp where the GPU supports
fragment high precision, mediump otherwise (mobile GPUs with coarse
trig precision).

### `GLSL_FS_PRECISION_MEDIUMP`

Fragment-precision mediump preamble — widgets that never leave the
low-frequency domain (fills, sheens) keep mediump everywhere.

### `GLSL_FS_PRECISION_LOWP`

Fragment-precision lowp preamble — blit/passthrough shaders only.

### `GLSL_DERIV_PRELUDE`

`GL_OES_standard_derivatives` enable prelude — widgets that compile
an AA/fwidth variant prepend this (and define HAS_DERIV for the
shader's feature branch).

### `GLSL_SDF_CAPSULE`

Signed distance to a capsule — segment SDF minus radius; the
burger glyph's stroke primitive.

### `GLSL_SDF_SEGMENT`

Distance to a segment (no radius term) — the slider widgets' track
SDF; same math as lkDistSegment in CLOSE_PAINT_GLSL, which keeps its
own copy under its test-coupled name.

### `GLSL_SDF_ROUND_BOX`

Signed distance to a rounded box — centered at the origin, `b` the
half-extent, `r` the corner radius (iq's canonical formula).

### `GLSL_HASH_SIN_2D`

Sine-hash — deterministic 2D→1D hash on the 127.1/311.7 seed (the
same seed the WGSL library's hash_sin_2d uses, so WebGPU and WebGL
fallbacks scatter identically).

### `GLSL_VALUE_NOISE`

Interpolated value noise over `hash` — smoothstep-weighted bilinear
mix of the four corner hashes (menu-background's fbm octave).
