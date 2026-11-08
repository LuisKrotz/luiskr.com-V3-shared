[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/canvas2d](../README.md) / mountMeshDemo

```ts
function mountMeshDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/canvas2d.ts:333

About-mesh demo — a miniature of the portrait's light-field halo:
concentric dot rows whose radius oscillates with a traveling radial
sinusoid, plus slowly precessing dotted guide spokes — the undulating
lattice ring the real mesh.ts paints behind the About photo.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the canvas).

## Returns

Teardown — cancels the loop.

() => `void`
