[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / ensureRegistryManifest

```ts
function ensureRegistryManifest(): Promise<SFRegistryManifest | null>;
```

Defined in: experiments/star-field/engine/registry.ts:100

Fetches the registry manifest once per session — the directory needs
it for the per-kind counts and shard lists; selection paths don't
(ids self-decode to their shard).

## Returns

`Promise`\<[`SFRegistryManifest`](../interfaces/SFRegistryManifest.md) \| `null`\>

The parsed manifest, or null on fetch/parse failure.
