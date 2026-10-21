[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/gpu](../README.md) / tryGpuDraw

```ts
function tryGpuDraw(host, totalMs): void
```

Defined in: website/components/media/draw-text/gpu.ts:70

`tryGpuDraw` — attempts the WebGPU reveal for a just-triggered
element. Called from `startAnimation` after the char spans mount;
resolves silently — on any failure the CSS animation is the render
path (the canvas/class are only applied once the atlas + sheet are
live).

## Parameters

### host

[`DrawText`](../../../DrawText/classes/DrawText.md)

The draw-text element.

### totalMs

`number`

Wall-clock span of the reveal (last delay + duration)
— the overlay disarms itself after it, restoring DOM paint.

## Returns

`void`
