[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/fly](../README.md) / updateFly

```ts
function updateFly(s): void;
```

Defined in: experiments/star-field/engine/fly.ts:80

Advances the active tween one frame — lerps camera position and the
controls target along the eased progress; clears `s.fly` and fires
`done` when complete.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
