[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/webgpu-widget](../README.md) / getSharedGpuDevice

```ts
function getSharedGpuDevice(): Promise<GPUDevice | null>
```

Defined in: core/utils/gpu/webgpu-widget.ts:149

`getSharedGpuDevice` — request the adapter+device once and cache
the promise so concurrent mounts share one acquisition. Keyed on
the `navigator.gpu` object itself: swapping the handle re-requests.
Resolves null on any failure (no adapter, rejected device request,
undefined device) — every caller falls back to its WebGL/CSS path.
A device that later goes lost clears the cache so the next mount
re-requests cleanly.

## Returns

`Promise`\<`GPUDevice` \| `null`\>

The shared GPUDevice, or null when WebGPU is unusable.
