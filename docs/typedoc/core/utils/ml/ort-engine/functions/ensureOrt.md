[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/ml/ort-engine](../README.md) / ensureOrt

```ts
function ensureOrt(loadModule?): Promise<OrtModule | null>
```

Defined in: core/utils/ml/ort-engine.ts:124

Lazily imports and configures the ORT runtime — wasm binary paths,
single wasm thread (the models are tiny; the proxy worker isn't worth
a thread slot), and warning-level logging. Concurrent callers share
the first attempt; a rejected load clears the latch so a transient
failure doesn't permanently disable ML for the session.

## Parameters

### loadModule?

() => `Promise`\<[`OrtModule`](../interfaces/OrtModule.md)\>

Injectable loader — tests substitute a stub module.

## Returns

`Promise`\<[`OrtModule`](../interfaces/OrtModule.md) \| `null`\>

The configured ORT module, or null when unavailable.
