[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/fit](../README.md) / scheduleFit

```ts
function scheduleFit(host): void
```

Defined in: website/components/media/draw-text/fit.ts:200

Queues a fit pass for the host on the next animation frame instead of
measuring synchronously. All draw-text siblings mount in the same task
batch; coalescing their fits prevents sequential forced reflows — the
synchronous `fitText` remains available for callers that already hold
a stable layout (and for the test suite's deterministic asserts).

## Parameters

### host

[`DrawText`](../../../DrawText/classes/DrawText.md)

— the draw-text element

## Returns

`void`
