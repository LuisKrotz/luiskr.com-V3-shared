[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/registry](../README.md) / SFRegistryManifest

Defined in: experiments/star-field/engine/registry.ts:30

Manifest shape for `index/manifest.json` — per-kind record counts
and the shard file list so the directory can show totals before any
shard has been fetched.

## Properties

### total

```ts
total: number;
```

Defined in: experiments/star-field/engine/registry.ts:32

Total records across all kinds (139,563).

***

### shardSize

```ts
shardSize: number;
```

Defined in: experiments/star-field/engine/registry.ts:34

Records per shard file (1,000).

***

### kinds

```ts
kinds: Record<string, {
  count: number;
  shards: string[];
}>;
```

Defined in: experiments/star-field/engine/registry.ts:36

Per-kind stats: count + ordered shard filenames.
