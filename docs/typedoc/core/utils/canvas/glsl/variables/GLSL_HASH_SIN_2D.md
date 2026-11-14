[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_HASH\_SIN\_2D

```ts
const GLSL_HASH_SIN_2D: '\n  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\n'
```

Defined in: core/utils/canvas/glsl.ts:100

Sine-hash — deterministic 2D→1D hash on the 127.1/311.7 seed (the
same seed the WGSL library's hash_sin_2d uses, so WebGPU and WebGL
fallbacks scatter identically).
