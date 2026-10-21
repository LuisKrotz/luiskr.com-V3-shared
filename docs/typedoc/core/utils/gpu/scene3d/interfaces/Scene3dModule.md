[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/scene3d](../README.md) / Scene3dModule

Defined in: core/utils/gpu/scene3d.ts:203

The generated wasm-pack glue module shape for the scene3d crate:
the async wasm initializer plus the `mount` async constructor that
returns the engine handle.

## Properties

### default

```ts
default: (input?) => Promise<unknown>;
```

Defined in: core/utils/gpu/scene3d.ts:205

Async initializer returning the wasm exports.

#### Parameters

##### input?

`RequestInfo`

#### Returns

`Promise`\<`unknown`\>

---

### mount

```ts
mount: (canvas, device, w, h) => Promise<Scene3dSurface>
```

Defined in: core/utils/gpu/scene3d.ts:211

Engine constructor — binds the canvas to the shared GPUDevice and
configures the surface. Sync under the hood (no promises left in
wasm init); `await` tolerates the plain return unchanged.

#### Parameters

##### canvas

`HTMLCanvasElement`

##### device

`GPUDevice`

##### w

`number`

##### h

`number`

#### Returns

`Promise`\<[`Scene3dSurface`](Scene3dSurface.md)\>
