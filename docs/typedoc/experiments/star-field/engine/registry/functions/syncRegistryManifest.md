[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / syncRegistryManifest

```ts
function syncRegistryManifest(): SFRegistryManifest | null
```

Defined in: experiments/star-field/engine/registry.ts:138

Synchronous read of the registry manifest — the promise bag resolves
too late for the synchronous beforeprint walk, so the landed manifest
mirrors here for print composition (the deep-catalog index page reads
per-kind counts from it). Returns null until the first fetch lands.

## Returns

[`SFRegistryManifest`](../interfaces/SFRegistryManifest.md) \| `null`

The resolved manifest, or null.
