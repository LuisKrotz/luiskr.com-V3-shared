[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/canvas2d](../README.md) / mountSceneDemo

```ts
function mountSceneDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/canvas2d.ts:229

Space-scene demo — a depth-projected starfield: preallocated stars
recycle through a z range while the projection (perspective divide,
size/alpha falloff) maps them to screen — the same depth cue the
experiments three.js scene renders on the GPU, in miniature.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the canvas).

## Returns

Teardown — cancels the loop.

() => `void`
