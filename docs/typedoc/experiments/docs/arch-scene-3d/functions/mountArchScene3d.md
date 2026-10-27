[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene-3d](../README.md) / mountArchScene3d

```ts
function mountArchScene3d(canvas, roots, onPick, onReady?): Promise<ArchSceneHandle | null>
```

Defined in: experiments/docs/arch-scene-3d.ts:352

Mounts the scene3d arm: engine → orbit rig → async graph build →
rAF loop. Returns null on ANY engine/artifact failure — the caller
(mountArchScene) drops to the three.js path, so this mount can
never regress the portal.

## Parameters

### canvas

`HTMLCanvasElement`

Target canvas (same element the three path uses).

### roots

`object`[]

Manifest root buckets.

### onPick

(`_path`) => `void`

Called with the manifest path on a node pick.

### onReady?

() => `void`

Called once the async graph build lands — the host
drops the stage's loading veil on this signal.

## Returns

`Promise`\<
\| [`ArchSceneHandle`](../../arch-scene/interfaces/ArchSceneHandle.md)
\| `null`\>

The scene handle, or null when the engine can't mount.
