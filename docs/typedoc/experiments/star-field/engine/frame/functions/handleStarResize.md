[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/frame](../README.md) / handleStarResize

```ts
function handleStarResize(s): void;
```

Defined in: experiments/star-field/engine/frame.ts:167

Resize step: measures the shadow host first, then the canvas parent,
then the window. Pixel ratio caps at 2 to prevent 3x-phone fill-rate
blowout.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
