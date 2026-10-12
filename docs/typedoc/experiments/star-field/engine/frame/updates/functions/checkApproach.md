[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/updates](../README.md) / checkApproach

```ts
function checkApproach(s): void
```

Defined in: experiments/star-field/engine/frame/updates.ts:28

Proximity check — when the camera comes within a body's approach
distance its dossier JSON prefetches via `onApproach`, once per body
per session (the `approached` set). Selection prefetches too, so a
slow drift-through and a direct nav click share one cache.

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
