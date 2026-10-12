[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/updates](../README.md) / updateLod

```ts
function updateLod(s): void
```

Defined in: experiments/star-field/engine/frame/updates.ts:59

Detail level-of-detail — toggles each node's secondary geometry
(shells, satellite pivots) by camera distance so remote
bodies draw as one primitive. Orbit radius counts toward `size` so a
body's ring stays visible while the camera is still inside it.

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
