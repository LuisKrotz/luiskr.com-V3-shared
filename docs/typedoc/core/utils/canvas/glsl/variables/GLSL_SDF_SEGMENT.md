[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_SDF\_SEGMENT

```ts
const GLSL_SDF_SEGMENT: '\n  float distCapsule(vec2 p, vec2 a, vec2 b) {\n    vec2 pa = p - a;\n    vec2 ba = b - a;\n    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);\n    return length(pa - ba * h);\n  }\n'
```

Defined in: core/utils/canvas/glsl.ts:79

Distance to a segment (no radius term) — the slider widgets' track
SDF; same math as lkDistSegment in CLOSE_PAINT_GLSL, which keeps its
own copy under its test-coupled name.
