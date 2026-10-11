[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / isRegistryId

```ts
function isRegistryId(id): boolean;
```

Defined in: experiments/star-field/engine/registry.ts:77

Type predicate — distinguishes the 139k registry ids from the 66
authored catalog slugs so selection/deep-link code can route each
path without a lookup table.

## Parameters

### id

`string`

Candidate body id.

## Returns

`boolean`

True for `star-NNNNNN`/`exoplanet-NNNNNN`/`dso-NNNNNN`.
