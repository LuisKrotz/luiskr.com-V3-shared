[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / mountArchSceneThree

```ts
function mountArchSceneThree(canvas, roots, onPick, onLost?): ArchSceneHandle | null
```

Defined in: experiments/docs/arch-scene.ts:311

The three.js/WebGL arm of the architecture scene — the original
renderer, kept as the synchronous fallback for every device without
WebGPU (and the `?debug=webGLMode:fallback` probe). Returns null when
no GL context can be acquired; the composite then reports `onLost`.

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

Called when the WebGL context is lost mid-flight.

## Returns

[`ArchSceneHandle`](../interfaces/ArchSceneHandle.md) \| `null`

The scene handle, or null when no GL context exists.
