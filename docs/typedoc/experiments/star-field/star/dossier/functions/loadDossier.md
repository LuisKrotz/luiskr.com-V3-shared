[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/star/dossier](../README.md) / loadDossier

```ts
function loadDossier(c, id): void;
```

Defined in: experiments/star-field/star/dossier.ts:222

Selection path — marks the panel loading, prefetches, then assigns the
resolved dossier only when the selection is still current (a fast
second select must not have a slow first response overwrite it).

## Parameters

### c

[`StarField`](../../../StarField/classes/StarField.md)

The StarField component.

### id

`string`

Selected body id.

## Returns

`void`
