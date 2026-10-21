[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/webgpu-widget](../README.md) / mountWebGpuWidget

```ts
function mountWebGpuWidget(kind, canvas, loadModule?, options?): Promise<WidgetHandle | null>
```

Defined in: core/utils/gpu/webgpu-widget.ts:269

Mounts a widget artifact on `canvas`: loads its wasm module, calls
`init`, wires resize + visibility-paused rAF, and returns the live
handle. Resolves null on any capability/artifact/init failure — the
caller's WebGL/CSS renderer stays the render path.

## Parameters

### kind

`number`

`GPU_WIDGET_KINDS` discriminant.

### canvas

`HTMLCanvasElement`

The widget's dedicated canvas element.

### loadModule?

(`url`) => `Promise`\<[`WidgetModule`](../interfaces/WidgetModule.md)\>

Injectable module loader (tests substitute a stub).

### options?

[`MountOptions`](../interfaces/MountOptions.md) = `{}`

Mount options — `GPU_WIDGET_DRIVE.MANUAL` leaves the
clock + resize to the caller's own loop.

## Returns

`Promise`\<[`WidgetHandle`](../interfaces/WidgetHandle.md) \| `null`\>
