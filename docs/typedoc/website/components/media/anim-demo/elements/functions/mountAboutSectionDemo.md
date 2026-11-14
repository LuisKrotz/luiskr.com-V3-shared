[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/elements](../README.md) / mountAboutSectionDemo

```ts
function mountAboutSectionDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/elements.ts:288

About-section demo — mounts the real <about-section> and pushes the
real about node + profile picture; the section's own machinery
mounts the glitch session, the warp mesh and the draw-text bio — so
the glitch-portrait and about-mesh records demo the production
surface itself.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the element).

## Returns

Teardown — blocks the late data write.

() => `void`
