[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/star-cloud](../README.md) / ensureStarCloud

```ts
function ensureStarCloud(s, THREE): void;
```

Defined in: experiments/star-field/engine/star-cloud.ts:177

Lazy-loads the real star field once per boot — fired fire-and-forget
from bootstrap after the body graph exists, so the 1.5 MB binary
streams in the background and the cloud fades in on the disc when it
decodes. No-ops on repeat calls, dispose, or fetch failure.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Star engine state bag.

### THREE

`__module`

The three.js module (lazy-loaded by bootstrap).

## Returns

`void`
