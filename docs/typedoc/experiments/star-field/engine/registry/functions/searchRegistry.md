[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / searchRegistry

```ts
function searchRegistry(query, limit?): Promise<SFRegistryRecord[]>;
```

Defined in: experiments/star-field/engine/registry.ts:226

Incremental registry search — pulls shards sequentially and collects
records whose display name or catalogue designation contains the
query (case-folded), stopping at `limit` matches so a "vega" search
resolves in one shard while still scaling to the full catalogue.

## Parameters

### query

`string`

Substring to match (empty returns nothing).

### limit?

`200` = `SF_STAR_CLOUD.SEARCH_LIMIT`

Match cap (default 200).

## Returns

`Promise`\<[`SFRegistryRecord`](../interfaces/SFRegistryRecord.md)[]\>

Matching records in shard order (brightest/alphabetical).
