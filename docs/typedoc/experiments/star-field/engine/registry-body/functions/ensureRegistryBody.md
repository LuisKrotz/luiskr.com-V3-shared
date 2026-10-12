[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry-body](../README.md) / ensureRegistryBody

```ts
function ensureRegistryBody(s, rec): void
```

Defined in: experiments/star-field/engine/registry-body.ts:300

Materializes the rendered body for a catalog record at its true
heliocentric chart position — the object the cloud point stands in
for. LRU-cached on `s.registryBodies`; a cache overflow evicts and
disposes the oldest spawn so mesh count stays bounded. No-ops on
missing THREE/deps (pre-boot), missing Sun pivot, or dispose.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

### rec

[`SFRegistryRecord`](../../registry/interfaces/SFRegistryRecord.md)

The resolved registry record.

## Returns

`void`
