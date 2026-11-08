[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountDeckDemo

```ts
function mountDeckDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:329

Mentions-deck demo — two-phase swipe: the front card (slot 0) flies
out on the first beat, then re-seats at the back while the next card
slides to front — the drag-dismiss + autoplay cycle in miniature.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the deck cards).

## Returns

Teardown — stops the swipe cycle.

() => `void`
