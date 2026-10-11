[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/materials](../README.md) / matParams

```ts
function matParams<T>(opts): T;
```

Defined in: experiments/star-field/engine/materials.ts:17

Returns a copy of `opts` without keys whose value is `undefined` —
safe to spread into any `*Material` parameter object.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

## Parameters

### opts

`T`

Material parameter object possibly containing undefineds.

## Returns

`T`

The same shape minus undefined values.
