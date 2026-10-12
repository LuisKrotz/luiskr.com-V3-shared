[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/updates](../README.md) / updateStructures

```ts
function updateStructures(s): void
```

Defined in: experiments/star-field/engine/frame/updates.ts:137

Cosmic-hierarchy shell fade — hides the inside of every boundary bubble
while the camera is deep within it. A huge fresnel shell viewed from
the interior paints a bright silhouette over the whole sky (the giant
cream-ball bug), so each structure's shell ramps to visible only once
the camera has pulled back to 1.25–1.7× its radius.

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
