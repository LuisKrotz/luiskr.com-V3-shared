[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/scene3d](../README.md) / resizeScene3d

```ts
function resizeScene3d(surface, canvas): void
```

Defined in: core/utils/gpu/scene3d.ts:247

Pushes the canvas's current device-px size into the engine — the
same DPR-aware measurement the widget bridge performs, shared by the
mount path and the ResizeObserver arm.

## Parameters

### surface

[`Scene3dSurface`](../interfaces/Scene3dSurface.md)

The live engine handle.

### canvas

`HTMLCanvasElement`

The host canvas.

## Returns

`void`
