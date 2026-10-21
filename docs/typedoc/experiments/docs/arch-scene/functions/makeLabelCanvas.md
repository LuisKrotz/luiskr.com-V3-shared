[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / makeLabelCanvas

```ts
function makeLabelCanvas(name, ink): HTMLCanvasElement | null
```

Defined in: experiments/docs/arch-scene.ts:159

Draws a dir-name label onto a fresh 2d canvas — shared by the
three.js sprite arm (CanvasTexture) and the scene3d arm
(createImageBitmap → texture upload). Returns null when 2d canvas
is unavailable (happy-dom, exotic runtimes) so the scene still
mounts label-free.

## Parameters

### name

`string`

Folder name drawn on the label.

### ink

`string`

Theme ink color resolved from the canvas' computed style.

## Returns

`HTMLCanvasElement` \| `null`
