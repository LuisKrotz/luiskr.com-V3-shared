[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-image-decoder](../README.md) / DecodeItem

Defined in: core/utils/wasm/wasm-image-decoder.ts:20

One queued decode request — URL plus optional GPU resize hints.

## Properties

### url

```ts
url: string;
```

Defined in: core/utils/wasm/wasm-image-decoder.ts:22

CDN URL of the source image.

***

### width?

```ts
optional width?: number;
```

Defined in: core/utils/wasm/wasm-image-decoder.ts:24

Target display width — passed to createImageBitmap as a resize hint.

***

### height?

```ts
optional height?: number;
```

Defined in: core/utils/wasm/wasm-image-decoder.ts:26

Target display height — passed to createImageBitmap as a resize hint.
