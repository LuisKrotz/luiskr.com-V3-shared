[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/elements](../README.md) / mountCardStackDemo

```ts
function mountCardStackDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/elements.ts:176

Card-stack demo — mounts the real <card-stack> coverflow and pushes
the real portfoliolist (featured flags resolved like home's
processedItems). The deck's own autoplay/drag/spring machinery owns
the animation; the demo only supplies data.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the element).

## Returns

Teardown — blocks the late data write.

() => `void`
