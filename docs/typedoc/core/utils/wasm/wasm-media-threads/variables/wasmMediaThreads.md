[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-media-threads](../README.md) / wasmMediaThreads

```ts
const wasmMediaThreads: WASMMediaThreadManager;
```

Defined in: core/utils/wasm/wasm-media-threads.ts:274

Shared media-threads singleton — the three memoization maps are global
so probes/prefetches/decodes are deduplicated across every surface.
