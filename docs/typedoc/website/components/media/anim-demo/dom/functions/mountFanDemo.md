[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountFanDemo

```ts
function mountFanDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:239

Card-stack demo — walks each staged card's slot one step per beat so
the fanned cards deal through the front slot (data-index −2…2 maps to
the SCSS transform/z-index ladder; the wrap-around card slides to the
far end the way the real deck recycles a dealt card).

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the fanned cards).

## Returns

Teardown — stops the deal cycle.

() => `void`
