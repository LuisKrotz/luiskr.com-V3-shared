[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountRelatedTilesDemo

```ts
function mountRelatedTilesDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:125

Related-tile reveal demo — walks the staged tiles' hover modifier
one index per beat so the lift rises tile-by-tile like the related
list's staggered scroll reveal.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the tile row).

## Returns

Teardown — stops the stagger cycle.

() => `void`
