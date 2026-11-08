[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountDrawDemo

```ts
function mountDrawDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:156

DrawText demo — resets then re-triggers the element so the
letter-drawing replay loop mirrors the real heading's reveal.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the <draw-text> element).

## Returns

Teardown — stops the replay cycle.

() => `void`
