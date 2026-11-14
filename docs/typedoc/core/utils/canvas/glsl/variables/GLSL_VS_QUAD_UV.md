[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_VS\_QUAD\_UV

```ts
const GLSL_VS_QUAD_UV: '\n  attribute vec2 a_pos;\n  varying vec2 v_uv;\n  void main() {\n    v_uv = (a_pos + 1.0) * 0.5;\n    gl_Position = vec4(a_pos, 0.0, 1.0);\n  }\n'
```

Defined in: core/utils/canvas/glsl.ts:21

Quad→UV vertex stage — `a_pos` −1..1 → `v_uv` 0..1, unflipped.
