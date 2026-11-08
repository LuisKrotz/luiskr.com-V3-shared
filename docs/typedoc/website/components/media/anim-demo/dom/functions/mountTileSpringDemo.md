[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountTileSpringDemo

```ts
function mountTileSpringDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:105

Mosaic-tile spring demo — toggles the hover modifier on the spring
tile so the transform transition replays the real tile's overshoot
ease (the displaced lift is a CSS var the class animates).

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the spring tile).

## Returns

Teardown — stops the hover cycle.

() => `void`
