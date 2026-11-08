[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountSearchDemo

```ts
function mountSearchDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:312

Route-search demo — toggles the loading modifier so the staged field
alternates idle ↔ scoring-in-flight (spinning glyph + bouncing dots).

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the field).

## Returns

Teardown — stops the loading cycle.

() => `void`
