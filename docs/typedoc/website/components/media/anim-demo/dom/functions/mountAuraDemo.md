[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/anim-demo/dom](../README.md) / mountAuraDemo

```ts
function mountAuraDemo(ctx): () => void
```

Defined in: website/components/media/anim-demo/dom.ts:234

Nav icon-aura demo — mounts the real `mountRingFill` WebGPU session
on the stage's strip and cycles `setProgress` across the two chips
(the real hover path, automated). Where the widget layer is off the
session is null and the fallback alternates the armed modifier so the
static SVG comet-trail cue still sweeps — the production appearance
every non-WebGPU viewer sees.

## Parameters

### ctx

[`DemoContext`](../../types/interfaces/DemoContext.md)

The demo context (stage owns the strip + chips).

## Returns

Teardown — stops the cycle, destroys the aura session.

() => `void`
