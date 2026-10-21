[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/widgets/switch-slider/init](../README.md) / tryWasm

```ts
function tryWasm(host): void
```

Defined in: core/utils/canvas/widgets/switch-slider/init.ts:90

Attempts the WebGPU wasm switch (~48KB artifact, own GPUDevice).
MANUAL drive: this class keeps its own spring loop, so the bridge
only initializes the surface. On any failure initRest() runs the
exact previous path (WebGL → 2D → CSS).

## Parameters

### host

[`SwitchWebGL`](../../classes/SwitchWebGL.md)

The switch whose canvas the wasm widget should claim.

## Returns

`void`
