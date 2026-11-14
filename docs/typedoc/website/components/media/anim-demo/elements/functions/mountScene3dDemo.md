[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/elements](../README.md) / mountScene3dDemo

```ts
function mountScene3dDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/elements.ts:442

3D-scene demo — the stage carries two stacked full-size canvases:
the first always paints the 2D starfield approximation (it is also
the fallback surface); the real scene3d engine mounts on the last
one and, where WebGPU is available, composites its own seeded mini
scene over the field. Splitting the surfaces keeps the fallback's
2D context alive — a shared canvas can't re-bind '2d' once the
engine claims it for WebGPU, which is how the single-canvas version
stranded the stage on a transparent blank.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the canvas pair).

## Returns

Teardown — destroys whichever surfaces mounted.

() => `void`
