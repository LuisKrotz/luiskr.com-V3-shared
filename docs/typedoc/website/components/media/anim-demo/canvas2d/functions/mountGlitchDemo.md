[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/canvas2d](../README.md) / mountGlitchDemo

```ts
function mountGlitchDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/canvas2d.ts:93

Glitch-portrait demo — paints a portrait silhouette to an offscreen
canvas once, then per frame redraws it whole plus an intermittent
burst of horizontal slices displaced left/right in alternating
neon tints — the channel split the real session produces around the
portrait's edges.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the canvas).

## Returns

Teardown — cancels the loop.

() => `void`
