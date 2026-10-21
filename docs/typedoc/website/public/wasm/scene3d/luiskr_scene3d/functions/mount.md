[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/scene3d/luiskr\_scene3d](../README.md) / mount

```ts
function mount(canvas, device, w, h): Surface3d
```

Defined in: website/public/wasm/scene3d/luiskr\_scene3d.d.ts:488

`mount` — bind a canvas to the page's SHARED GPUDevice and build
the renderer around it. The device is acquired once in JS
(`getSharedGpuDevice`) and passed to every artifact — per-widget
devices exhausted the driver's device budget on a widget-heavy
page (Windows/D3D12: `create command queue failed with
E_OUTOFMEMORY` after ~100 devices). Sync: with the device in hand
there is nothing to await, and a synchronous constructor can never
leave a wasm-bindgen closure dangling (the async-future trap was
the "closure invoked recursively" cascade). `await` on the JS side
tolerates the non-promise return unchanged.

## Parameters

### canvas

`HTMLCanvasElement`

The host canvas element.

### device

`GPUDevice`

The shared GPUDevice (one per page, from the JS bridge).

### w

`number`

### h

`number`

Backing size in DEVICE pixels.

## Returns

[`Surface3d`](../classes/Surface3d.md)

The scene handle, or a JS error string on init failure.
