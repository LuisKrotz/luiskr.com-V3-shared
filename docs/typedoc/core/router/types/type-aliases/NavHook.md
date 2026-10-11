[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/router/types](../README.md) / NavHook

```ts
type NavHook = (_to, from) => unknown;
```

Defined in: core/router/types.ts:42

Guard/hook signature — a returned string/{path} short-circuits into a redirect.

## Parameters

### \_to

[`RouteDescriptor`](../interfaces/RouteDescriptor.md)

### from

[`RouteDescriptor`](../interfaces/RouteDescriptor.md) \| `null`

## Returns

`unknown`
