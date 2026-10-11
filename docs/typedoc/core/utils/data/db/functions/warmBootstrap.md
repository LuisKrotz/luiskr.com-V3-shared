[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/data/db](../README.md) / warmBootstrap

```ts
function warmBootstrap(locale): void;
```

Defined in: core/utils/data/db.ts:93

Starts downloading the core snapshot chunk for a locale right away so the
first render does not wait for an extra network hop after the route chunk.

## Parameters

### locale

`string`

## Returns

`void`
