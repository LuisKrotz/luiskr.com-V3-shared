[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/rand](../README.md) / lcg

```ts
function lcg(seed): () => number;
```

Defined in: experiments/star-field/engine/rand.ts:15

Deterministic linear congruential generator — same seed → same
sequence every session (Numerical-Recipes constants).

## Parameters

### seed

`number`

Arbitrary seed derived from a body id hash.

## Returns

() => float in [0,1).

() => `number`
