[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/burn/wasm](../README.md) / destroyBurnWasm

```ts
function destroyBurnWasm(s): void
```

Defined in: core/utils/burn/wasm.ts:239

Releases the wasm handle + removes the particle canvas — teardown
path only; a pending mount drops its canvas when it resolves.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The session being torn down.

## Returns

`void`
