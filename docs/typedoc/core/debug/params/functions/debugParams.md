[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/debug/params](../README.md) / debugParams

```ts
function debugParams(): string[];
```

Defined in: core/debug/params.ts:28

All `debug` values on the current URL (empty outside a windowed context).
`getAll` (not `get`) because the param is repeatable — `?debug=a&debug=b`
must surface both flags.

## Returns

`string`[]

Every `?debug=` value in order.
