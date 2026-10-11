[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / mountArchScene

```ts
function mountArchScene(
   canvas, 
   roots, 
   onPick, 
   onLost?
): ArchSceneHandle | null;
```

Defined in: experiments/docs/arch-scene.ts:223

Mounts the architecture scene on `canvas`.

## Parameters

### canvas

`HTMLCanvasElement`

Target canvas.

### roots

`object`[]

Manifest root buckets (each becomes an inner-ring node).

### onPick

(`_path`) => `void`

Called with the manifest path when a node is picked.

### onLost?

() => `void`

Called once when the GL context dies mid-flight so the
                host can hide/remount the scene — the portal keeps
                working without WebGL.

## Returns

[`ArchSceneHandle`](../interfaces/ArchSceneHandle.md) \| `null`

Scene handle, or null when WebGL is unavailable.
