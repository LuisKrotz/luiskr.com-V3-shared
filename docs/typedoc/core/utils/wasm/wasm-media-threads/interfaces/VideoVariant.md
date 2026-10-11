[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-media-threads](../README.md) / VideoVariant

Defined in: core/utils/wasm/wasm-media-threads.ts:22

One candidate rendition of a video — URL plus optional quality metadata.

## Properties

### url

```ts
url: string;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:24

CDN URL of this rendition.

***

### quality?

```ts
optional quality?: string;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:26

Quality label ('360p', '720p', …) — informational for the worker.

***

### width?

```ts
optional width?: number;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:28

Rendition pixel width — drives the GPU-upload resize hint.

***

### height?

```ts
optional height?: number;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:30

Rendition pixel height — drives the GPU-upload resize hint.
