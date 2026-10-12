[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/post](../README.md) / buildStarPostPipeline

```ts
function buildStarPostPipeline(s, deps): void
```

Defined in: experiments/star-field/engine/post.ts:53

Assembles the RenderPipeline post chain (screen-space, in order):
scene → +bloom → vignette → film grain
Bloom sits first so the vignette shapes the halos too, and grain lands
last so it dithers the final frame. On any failure the pipeline is
torn down and `s.pipeline` stays null — the frame loop then renders
the scene directly with no post.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state (renderer/scene/camera must be live).

### deps

[`SFPostDeps`](../interfaces/SFPostDeps.md)

Lazy-loaded TSL/post dependencies.

## Returns

`void`
