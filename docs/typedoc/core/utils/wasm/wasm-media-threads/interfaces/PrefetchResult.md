[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-media-threads](../README.md) / PrefetchResult

Defined in: core/utils/wasm/wasm-media-threads.ts:46

Outcome of a quality-variant prefetch — the winning variant + poster.

## Indexable

```ts
[key: string]: unknown
```

Extra worker diagnostics — forward-compatible.

## Properties

### best?

```ts
optional best?: VideoVariant;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:48

Variant the worker judged best (first byte-range to arrive / quality).

***

### poster?

```ts
optional poster?: ImageBitmap;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:50

Poster frame decoded to a zero-copy ImageBitmap in the worker.
