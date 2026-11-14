[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/elements](../README.md) / mountAwardsCarouselDemo

```ts
function mountAwardsCarouselDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/elements.ts:226

Awards-carousel demo — mounts the real <awards-carousel> in its
awards variant with the real mention slides; the dwell is shortened
to a demo-visible cadence (the momentum/clone-wrap animation is the
production path regardless).

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the element).

## Returns

Teardown — blocks the late data write.

() => `void`
