[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/wasm/wasm-search](../README.md) / searchRoutes

```ts
function searchRoutes(items, query): Promise<RouteSearchHit[]>
```

Defined in: core/utils/wasm/wasm-search.ts:131

`searchRoutes` — batch-dispatches the scoring to the wasm pool and
resolves the ranked hits; resolves the identical JS result when the
pool can't answer (no workers, timeout, wiped pool).

## Parameters

### items

[`RouteSearchItem`](../interfaces/RouteSearchItem.md)[]

Catalog rows.

### query

`string`

Raw input text.

## Returns

`Promise`\<[`RouteSearchHit`](../interfaces/RouteSearchHit.md)[]\>

Ranked hits; never rejects.
