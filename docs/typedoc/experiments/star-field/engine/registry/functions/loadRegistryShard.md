[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / loadRegistryShard

```ts
function loadRegistryShard(kind, shardIx): Promise<SFRegistryRecord[] | null>;
```

Defined in: experiments/star-field/engine/registry.ts:129

Fetches (or returns the cached promise for) one 1,000-record shard —
shards are the lazy-load unit so browsing the catalogue never pulls
the full 14 MB index up front.

## Parameters

### kind

`string`

Record kind (`star`/`exoplanet`/`dso`).

### shardIx

`number`

Zero-based shard index.

## Returns

`Promise`\<[`SFRegistryRecord`](../interfaces/SFRegistryRecord.md)[] \| `null`\>

The parsed record array, or null on failure.
