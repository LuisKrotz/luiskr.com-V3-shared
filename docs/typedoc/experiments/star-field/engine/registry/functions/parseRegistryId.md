[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / parseRegistryId

```ts
function parseRegistryId(id): 
  | {
  kind: string;
  rank: number;
}
  | null;
```

Defined in: experiments/star-field/engine/registry.ts:88

Splits a registry id into its kind and global rank — the two numbers
the shard math needs (`shard = rank ÷ shardSize`, `slot = rank mod
shardSize`). Returns null on malformed ids.

## Parameters

### id

`string`

Registry id (`star-000042`).

## Returns

  \| \{
  `kind`: `string`;
  `rank`: `number`;
\}
  \| `null`

`{ kind, rank }` or null.
