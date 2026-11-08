[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/mounts](../README.md) / mountBurnDemo

```ts
function mountBurnDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/mounts.ts:50

Mosaic title combustion — the REAL burn pipeline (utils/burn) armed
on a one-card demo surface: raster, consume front, ember particles,
<draw-text> rewrite, then the un-burn rebuild — the hover/un-hover
choreography replayed on the cycle.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context — host supplies the `$` contract.

## Returns

Teardown — stops the cycle and disarms any live session.

() => `void`
