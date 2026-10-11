[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-pool](../README.md) / wasmPool

```ts
const wasmPool: WasmWorkerPool;
```

Defined in: core/utils/wasm/wasm-pool.ts:298

Shared pool singleton — all WASM dispatch callers funnel through one
instance so workers are spawned once and round-robin state is global.
