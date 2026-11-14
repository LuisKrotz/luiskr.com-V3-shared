[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/loaders/page-backdrop/loop](../README.md) / handleResize

```ts
function handleResize(host): void
```

Defined in: core/utils/canvas/loaders/page-backdrop/loop.ts:82

Syncs the backing store with the viewport. The canvas is fixed and
fullscreen, so the viewport IS its box — no layout read needed. DPR is
capped (the dither only needs device pixels, not supersampling) and
each axis is capped so a 4K×2 display never allocates a giant buffer.

## Parameters

### host

[`PageBackdropWebGL`](../../../page-backdrop-webgl/classes/PageBackdropWebGL.md)

the backdrop instance to resize

## Returns

`void`
