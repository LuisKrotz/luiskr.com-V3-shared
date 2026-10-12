[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/updates](../README.md) / updateDayNight

```ts
function updateDayNight(s): void
```

Defined in: experiments/star-field/engine/frame/updates.ts:315

Day/night uniform feed — for every body whose shading depends on the
sun direction (night-lights emissive gating, atmosphere rim shells)
writes `dir = normalize(sunPos − bodyPos)` into the shared vector the
material's TSL uniform wraps. `anchorWorldPos`'s shared scratch is
copied before the loop so the sun position survives each resolution.

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
