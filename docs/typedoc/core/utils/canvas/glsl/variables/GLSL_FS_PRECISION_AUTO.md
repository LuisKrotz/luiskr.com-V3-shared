[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/canvas/glsl](../README.md) / GLSL\_FS\_PRECISION\_AUTO

```ts
const GLSL_FS_PRECISION_AUTO: '\n  #ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  #else\n  precision mediump float;\n  #endif\n'
```

Defined in: core/utils/canvas/glsl.ts:45

Fragment-precision auto preamble — highp where the GPU supports
fragment high precision, mediump otherwise (mobile GPUs with coarse
trig precision).
