[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / streamRegistryShards

```ts
function streamRegistryShards(kind): AsyncGenerator<SFRegistryRecord[], void, void>;
```

Defined in: experiments/star-field/engine/registry.ts:201

Streams registry shards for a kind in order — the directory's
incremental "load more" path; yields each parsed shard so callers can
append results as they land without holding 120k records at once.

## Parameters

### kind

`string`

Record kind to stream.

## Returns

`AsyncGenerator`\<[`SFRegistryRecord`](../interfaces/SFRegistryRecord.md)[], `void`, `void`\>
