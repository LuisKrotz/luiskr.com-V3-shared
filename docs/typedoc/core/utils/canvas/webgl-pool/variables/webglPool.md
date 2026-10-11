[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/canvas/webgl-pool](../README.md) / webglPool

```ts
const webglPool: WebGLPoolManager;
```

Defined in: core/utils/canvas/webgl-pool.ts:241

Shared pool singleton — one observer + one entry map governs every WebGL
canvas so purge/restore stays consistent and the context budget is global.
