[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/picking](../README.md) / bindPicking

```ts
function bindPicking(s): void;
```

Defined in: experiments/star-field/engine/picking.ts:133

Binds the pointer listeners on the render canvas: down records origin +
cancels fly, up-within-threshold selects, move updates hover. Listeners
live in state so destroy() can detach them all.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
