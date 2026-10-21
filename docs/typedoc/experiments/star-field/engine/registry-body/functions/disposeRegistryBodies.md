[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry-body](../README.md) / disposeRegistryBodies

```ts
function disposeRegistryBodies(s): void
```

Defined in: experiments/star-field/engine/registry-body.ts:365

Strips every spawned registry body — engine teardown and any
context-loss path call this so the LRU set can't leak GPU buffers.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
