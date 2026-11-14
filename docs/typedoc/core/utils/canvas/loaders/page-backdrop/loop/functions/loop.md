[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [core/utils/canvas/loaders/page-backdrop/loop](../README.md) / loop

```ts
function loop(host): void
```

Defined in: core/utils/canvas/loaders/page-backdrop/loop.ts:105

Pooled rAF callback — re-arms itself and draws one frame. Bails when
the loop was stopped, the context is gone, or the path fell back.

## Parameters

### host

[`PageBackdropWebGL`](../../../page-backdrop-webgl/classes/PageBackdropWebGL.md)

the backdrop instance ticking

## Returns

`void`
