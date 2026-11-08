[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountModalLoadingDemo

```ts
function mountModalLoadingDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:362

Expand-modal loading demo — toggles the ready modifier so the staged
lightbox alternates spinner ↔ shimmer-sweep, the loading lifecycle
the real lightbox plays while the full-size asset decodes.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the modal panel).

## Returns

Teardown — stops the loading cycle.

() => `void`
