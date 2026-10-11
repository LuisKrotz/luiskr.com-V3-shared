[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-media-threads](../README.md) / MediaSegment

Defined in: core/utils/wasm/wasm-media-threads.ts:62

One byte-range fetch request for parallel segment download.

## Properties

### url

```ts
url: string;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:64

URL of the resource (same file, different ranges).

***

### byteStart?

```ts
optional byteStart?: number;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:66

Inclusive start offset — defaults to 0 when omitted.

***

### byteEnd?

```ts
optional byteEnd?: number | null;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:68

Exclusive end offset — null fetches to EOF.
