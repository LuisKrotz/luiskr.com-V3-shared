[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/worker](../README.md) / SF\_WORKER

```ts
const SF_WORKER: Readonly<{
  CHUNK_MIN: 40000
  MAX_CHUNKS: 4
}>
```

Defined in: core/tokens/starfield/params/worker.ts:17

Worker-dispatch tuning for the seeded buffer fills — chunking bounds
so large fills (the 400k-point disc, the 139k-record decode) split
across the pool for true multi-threaded throughput while small fills
ride a single dispatch.
