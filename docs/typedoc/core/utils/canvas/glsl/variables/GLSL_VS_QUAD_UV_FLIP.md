[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_VS\_QUAD\_UV\_FLIP

```ts
const GLSL_VS_QUAD_UV_FLIP: '\n  attribute vec2 a_position;\n  varying vec2 v_uv;\n  void main() {\n    v_uv = vec2(a_position.x * 0.5 + 0.5, 1.0 - (a_position.y * 0.5 + 0.5));\n    gl_Position = vec4(a_position, 0.0, 1.0);\n  }\n'
```

Defined in: core/utils/canvas/glsl.ts:33

Quad→UV vertex stage with vertically flipped UVs — the media-upload
blit inverts Y so DOM-source textures land right-side up. Uses the
`a_position` attribute name the GPUAccelerator binds.
