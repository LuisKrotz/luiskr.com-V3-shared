[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/gpu](../README.md) / teardownGpuDraw

```ts
function teardownGpuDraw(host): void
```

Defined in: website/components/media/draw-text/gpu.ts:556

`teardownGpuDraw` — disarms the overlay without touching DOM paint:
used by reset()/disconnectedCallback (where the DOM re-renders to
the pending state on its own) and by `finish` (after the class drop).

## Parameters

### host

[`DrawText`](../../../DrawText/classes/DrawText.md)

The draw-text element.

## Returns

`void`
