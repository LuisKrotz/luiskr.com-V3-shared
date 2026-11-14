[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountLoaderDemo

```ts
function mountLoaderDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:37

Intro-loader demo — the percent readout counts 0→100 on coarse
beats while the staged rings/fill sweep in CSS (keyframes own the
smooth interpolation, JS only writes the coarse text like the real
loader's percent ticker).

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the counter span).

## Returns

Teardown — stops the counter cycle.

() => `void`
