[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/scene3d](../README.md) / loadScene3dTexture

```ts
function loadScene3dTexture(surface, url, targetW, targetH): Promise<number | null>
```

Defined in: core/utils/gpu/scene3d.ts:375

Decodes `url` through the shared wasm image pipeline (fetch → worker
createImageBitmap → GPU texture, zero CPU readback) and uploads it —
the texture half of `THREE.TextureLoader.loadAsync`. Resolves the
registry texture id, or null when decode/upload fails so the caller
falls back to a procedural color (same contract as the engines'
missing-texture arm).

## Parameters

### surface

[`Scene3dSurface`](../interfaces/Scene3dSurface.md)

The live engine handle.

### url

`string`

CDN image URL.

### targetW

`number`

GPU resize-hint width.

### targetH

`number`

GPU resize-hint height.

## Returns

`Promise`\<`number` \| `null`\>
