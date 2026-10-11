[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / loadRegistryRecord

```ts
function loadRegistryRecord(id): Promise<SFRegistryRecord | null>;
```

Defined in: experiments/star-field/engine/registry.ts:167

Resolves a registry id to its full record — pure shard arithmetic
(`shard = rank ÷ 1000`, `slot = rank mod 1000`), one fetch worst
case, cache-hit best case. Out-of-range ids resolve null so stale
links degrade silently to the overview chart.

## Parameters

### id

`string`

Registry id (`star-000042`).

## Returns

`Promise`\<[`SFRegistryRecord`](../interfaces/SFRegistryRecord.md) \| `null`\>

The record, or null when unknown/unreachable.
