[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/widgets/close-button/init](../README.md) / tryWasm

```ts
function tryWasm(host): void
```

Defined in: core/utils/canvas/widgets/close-button/init.ts:161

Attempts the WebGPU wasm close button (~48KB artifact, own
GPUDevice). MANUAL drive: this class keeps its own eased-channel
loop, so the bridge only initializes the surface. On any failure
initRest() runs the exact previous path (WebGL → CSS X).

## Parameters

### host

[`CloseButtonWebGL`](../../classes/CloseButtonWebGL.md)

The button whose canvas the wasm widget should claim.

## Returns

`void`
