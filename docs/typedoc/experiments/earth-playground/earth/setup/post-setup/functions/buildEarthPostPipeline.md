[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/setup/post-setup](../README.md) / buildEarthPostPipeline

```ts
function buildEarthPostPipeline(s, deps): void;
```

Defined in: experiments/earth-playground/earth/setup/post-setup.ts:81

Assembles the RenderPipeline post chain (screen-space, in order):
  scene → CA fringe → +bloom → color grade → vignette → film grain
CA is applied before bloom so the halo isn't itself fringed.

## Parameters

### s

[`EarthState`](../../../runtime/state/interfaces/EarthState.md)

### deps

[`EarthPostDeps`](../interfaces/EarthPostDeps.md)

## Returns

`void`
