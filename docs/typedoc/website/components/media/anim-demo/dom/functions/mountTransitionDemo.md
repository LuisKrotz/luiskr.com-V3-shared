[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountTransitionDemo

```ts
function mountTransitionDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:276

View-transition demo — alternates the gone modifier between the two
staged panes so the outgoing "page" fades out as the incoming one
fades in, the #view-outlet cross-fade in miniature.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the pane pair).

## Returns

Teardown — stops the cross-fade cycle.

() => `void`
