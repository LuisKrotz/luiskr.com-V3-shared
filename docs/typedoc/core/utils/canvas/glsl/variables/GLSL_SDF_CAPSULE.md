[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_SDF\_CAPSULE

```ts
const GLSL_SDF_CAPSULE: '\n  float sdCapsule(vec2 p, vec2 a, vec2 b, float r) {\n    vec2 pa = p - a, ba = b - a;\n    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);\n    return length(pa - ba * h) - r;\n  }\n'
```

Defined in: core/utils/canvas/glsl.ts:68

Signed distance to a capsule — segment SDF minus radius; the
burger glyph's stroke primitive.
