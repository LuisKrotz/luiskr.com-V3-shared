[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/gpu/scene3d](../README.md) / Scene3dHandle

Defined in: core/utils/gpu/scene3d.ts:220

Live scene handle returned by `mountScene3d`.

## Properties

### canvas

```ts
canvas: HTMLCanvasElement
```

Defined in: core/utils/gpu/scene3d.ts:222

The canvas the engine draws into (the caller's element).

---

### surface

```ts
surface: Scene3dSurface
```

Defined in: core/utils/gpu/scene3d.ts:224

The wasm `Surface3d` — call its flat id-API directly.

## Methods

### destroy()

```ts
destroy(): void;
```

Defined in: core/utils/gpu/scene3d.ts:226

Disconnects the ResizeObserver + drops the surface.

#### Returns

`void`
