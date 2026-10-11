[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-image-decoder](../README.md) / wasmImageDecoder

```ts
const wasmImageDecoder: WASMImageDecoder;
```

Defined in: core/utils/wasm/wasm-image-decoder.ts:212

Shared decoder singleton — the bitmap cache is global so a bitmap
decoded for one surface (mosaic) is reused by another (carousel).
