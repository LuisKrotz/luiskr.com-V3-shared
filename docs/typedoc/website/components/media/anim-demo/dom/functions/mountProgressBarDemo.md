[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountProgressBarDemo

```ts
function mountProgressBarDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:181

Route progress-bar demo — walks the staged bar through the real
nprogress choreography: crawl (active) → complete (done) → reset,
on long beats so each phase reads.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the bar element).

## Returns

Teardown — stops the phase cycle.

() => `void`
