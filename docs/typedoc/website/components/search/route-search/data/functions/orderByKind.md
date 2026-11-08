[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/data](../README.md) / orderByKind

```ts
function orderByKind(entries): RouteEntry[]
```

Defined in: website/components/search/route-search/data.ts:463

`orderByKind` — partitions scored hits into kind buckets ordered by
each bucket's best hit: the input arrives score-sorted, so a kind's
first occurrence index IS its group rank. A weak page keyword hit can
no longer outrank a strong project title match just because its kind
used to render first. The sort is stable, so the scorer's ordering
survives inside each bucket; undeclared kinds sort after every bucket.

## Parameters

### entries

[`RouteEntry`](../interfaces/RouteEntry.md)[]

Score-ordered hits from the matcher.

## Returns

[`RouteEntry`](../interfaces/RouteEntry.md)[]

The same hits partitioned into best-hit-ordered buckets.
