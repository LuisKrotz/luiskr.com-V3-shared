[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/scene3d](../README.md) / mountScene3d

```ts
function mountScene3d(canvas, loadModule?): Promise<Scene3dHandle | null>
```

Defined in: core/utils/gpu/scene3d.ts:264

Mounts the scene3d engine on `canvas`: loads the artifact, runs the
async mount (adapter + device + configure), wires a ResizeObserver
feeding device-px `resize`, and returns the live handle. Resolves
null on ANY capability/artifact/init failure — the caller keeps its
existing renderer, so mounting can never regress the page.

## Parameters

### canvas

`HTMLCanvasElement`

The scene's dedicated canvas element.

### loadModule?

(`url`) => `Promise`\<[`Scene3dModule`](../interfaces/Scene3dModule.md)\>

Injectable module loader (tests substitute a stub).

## Returns

`Promise`\<[`Scene3dHandle`](../interfaces/Scene3dHandle.md) \| `null`\>
