[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/star-cloud](../README.md) / disposeStarCloud

```ts
function disposeStarCloud(s): void;
```

Defined in: experiments/star-field/engine/star-cloud.ts:218

Disposes the cloud geometry/material on engine teardown so a hot
reload does not leak the 78k-point buffers.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Star engine state bag.

## Returns

`void`
