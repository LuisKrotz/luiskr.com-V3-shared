[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_SDF\_ROUND\_BOX

```ts
const GLSL_SDF_ROUND_BOX: '\n  float sdRoundBox(vec2 p, vec2 b, float r) {\n    vec2 q = abs(p) - b + r;\n    return min(max(q.x, q.y), 0.0) + length(max(q, vec2(0.0))) - r;\n  }\n'
```

Defined in: core/utils/canvas/glsl.ts:90

Signed distance to a rounded box — centered at the origin, `b` the
half-extent, `r` the corner radius (iq's canonical formula).
