[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/gpu/gpu-accel](../README.md) / gpuAccel

```ts
const gpuAccel: GPUAccelerator;
```

Defined in: core/utils/gpu/gpu-accel.ts:320

Shared GPU accelerator singleton — one offscreen context + texture
serves every media upload, so the page never holds duplicate pipelines.
