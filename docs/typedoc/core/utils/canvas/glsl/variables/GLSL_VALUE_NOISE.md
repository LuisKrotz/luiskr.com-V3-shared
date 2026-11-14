[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_VALUE\_NOISE

```ts
const GLSL_VALUE_NOISE: '\n  float noise(vec2 p){\n    vec2 i=floor(p),f=fract(p);\n    f=f*f*(3.-2.*f);\n    return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),\n               mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);\n  }\n'
```

Defined in: core/utils/canvas/glsl.ts:106

Interpolated value noise over `hash` — smoothstep-weighted bilinear
mix of the four corner hashes (menu-background's fbm octave).
