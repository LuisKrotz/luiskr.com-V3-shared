[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [experiments/earth-playground/earth/runtime/updates](../README.md) / updateEarthBloom

```ts
function updateEarthBloom(s, __namedParameters?): void;
```

Defined in: experiments/earth-playground/earth/runtime/updates.ts:18

Live-tweak bloom. `enabled` collapses strength to 0 rather than
removing the pass — the node graph stays compiled, so toggling is
free (no shader rebuild).

## Parameters

### s

[`EarthState`](../../state/interfaces/EarthState.md)

### \_\_namedParameters?

#### enabled?

`boolean`

#### strength?

`number`

#### radius?

`number`

#### threshold?

`number`

## Returns

`void`
