[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / mountArchScene

```ts
function mountArchScene(canvas, roots, onPick, onLost?): ArchSceneHandle | null
```

Defined in: experiments/docs/arch-scene.ts:743

Dual-path mount — the scene3d (rust/WebGPU) engine takes the scene
on capable hardware and the three.js arm remains the fallback for
every other device, exactly like the widget migrations. Capability
order: no `webglAllowed()` (explicit debug fallback / GL block) or
no `navigator.gpu` → straight to the three path, which keeps its
synchronous null contract. With WebGPU present the wasm arm mounts
async; any failure resolves into the three arm inside the same
handle (or `onLost` when GL is also absent).

## Parameters

### canvas

`HTMLCanvasElement`

Target canvas.

### roots

`object`[]

Manifest root buckets.

### onPick

(`_path`) => `void`

Called with the manifest path on a node pick.

### onLost?

() => `void`

Called once when no GPU path can mount — the host
hides the section (the three arm's own null return
already covered the no-WebGPU case).

## Returns

[`ArchSceneHandle`](../interfaces/ArchSceneHandle.md) \| `null`

Scene handle, or null only when the synchronous three
probe fails outright.
