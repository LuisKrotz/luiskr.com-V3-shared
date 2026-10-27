[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/widgets/theme-slider/init](../README.md) / tryWasm

```ts
function tryWasm(host): void
```

Defined in: core/utils/canvas/widgets/theme-slider/init.ts:114

Attempts the WebGPU wasm theme slider (~52KB artifact, own
GPUDevice). MANUAL drive: this class keeps its own spring loop and
pointer events, so the bridge only initializes the surface. On any
failure initRest() runs the exact previous path (WebGL → CSS).

## Parameters

### host

[`ThemeSliderWebGL`](../../classes/ThemeSliderWebGL.md)

The slider whose canvas the wasm widget should claim.

## Returns

`void`
