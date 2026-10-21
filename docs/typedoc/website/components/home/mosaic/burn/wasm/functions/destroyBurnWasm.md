[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [website/components/home/mosaic/burn/wasm](../README.md) / destroyBurnWasm

```ts
function destroyBurnWasm(s): void
```

Defined in: website/components/home/mosaic/burn/wasm.ts:240

Releases the wasm handle + removes the particle canvas — teardown
path only; a pending mount drops its canvas when it resolves.

## Parameters

### s

[`BurnSession`](../../types/interfaces/BurnSession.md)

The session being torn down.

## Returns

`void`
