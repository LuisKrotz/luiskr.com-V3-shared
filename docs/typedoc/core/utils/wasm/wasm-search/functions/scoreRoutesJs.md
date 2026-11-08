[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-search](../README.md) / scoreRoutesJs

```ts
function scoreRoutesJs(items, query): RouteSearchHit[]
```

Defined in: core/utils/wasm/wasm-search.ts:61

`scoreRoutesJs` — the synchronous scorer. Every query term must hit at
least one field (AND semantics so "dell design" can intersect title
words); an empty query returns the whole catalog in declaration order
(predict mode lists every route on focus).

## Parameters

### items

[`RouteSearchItem`](../interfaces/RouteSearchItem.md)[]

Catalog rows to rank.

### query

`string`

Raw input text.

## Returns

[`RouteSearchHit`](../interfaces/RouteSearchHit.md)[]

Hits sorted by score desc, stable on catalog order.
