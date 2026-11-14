[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountToastDemo

```ts
function mountToastDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:95

Site-toast demo — alternates the staged pill between the slide/fade
entrance and the exit states, the same choreography a real
notification item plays.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the toast item).

## Returns

Teardown — stops the in/out cycle.

() => `void`
