[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/updates](../README.md) / updateStarCloud

```ts
function updateStarCloud(s): void
```

Defined in: experiments/star-field/engine/frame/updates.ts:241

Deep-field cloud camera fade — the real catalogue surrounds the Sun
isotropically, so pulled far enough back it reads as a solid glowing
sphere regardless of the per-star edge fade. While the camera is
embedded the full density is correct (the local stellar neighborhood
IS a volume); once outside, the cloud rolls down to a faint floor so
it dissolves into the Milky Way disc instead of painting a ball.

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
