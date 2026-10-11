[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/data/wasm](../README.md) / WASM\_POOL

```ts
const WASM_POOL: Readonly<{
  WORKER_URL: "/scripts/workers/wasm-worker.js";
  ENGINE_URL: "/scripts/wasm/engine.wasm";
  MOBILE_MAX: 2;
  DESKTOP_MIN: 2;
  DESKTOP_MAX: 4;
  FALLBACK_CORES: 2;
  REPLY_TIMEOUT_MS: 8000;
}>;
```

Defined in: core/tokens/data/wasm.ts:41

Frozen worker-pool sizing + asset tokens. Sole declaration site for the
worker script path and the pool-size caps — mobile SoCs thermal-throttle
under wide pools so the cap is tighter than desktop; the cores fallback
covers engines without navigator.hardwareConcurrency.
