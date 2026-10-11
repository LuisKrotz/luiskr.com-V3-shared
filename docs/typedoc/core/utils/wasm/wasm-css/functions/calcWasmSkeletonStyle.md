[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-css](../README.md) / calcWasmSkeletonStyle

```ts
function calcWasmSkeletonStyle(
   w?, 
   h?, 
   r?
): WasmSkeletonStyle;
```

Defined in: core/utils/wasm/wasm-css.ts:155

Convenience wrapper over wasmCSS.calcWasmSkeletonStyle — the historical
free-function API kept so call sites stay on the old import.

## Parameters

### w?

`string` \| `number`

Width (CSS string or px number).

### h?

`string` \| `number`

Height (CSS string or px number).

### r?

`string`

Border-radius override.

## Returns

[`WasmSkeletonStyle`](../interfaces/WasmSkeletonStyle.md)

The skeleton style tuple.
