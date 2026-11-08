[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/data](../README.md) / staticEntries

```ts
function staticEntries(lang): RouteEntry[]
```

Defined in: website/components/search/route-search/data.ts:175

The static half of the catalog: home + section anchors + legal pages +
experimental surfaces + the docs portal. Titles resolve through the
same appText/componentText sources route meta uses, so a locale switch
renames the rows identically to the page titles themselves.

## Parameters

### lang

`string`

Current locale code.

## Returns

[`RouteEntry`](../interfaces/RouteEntry.md)[]

Static route entries in menu order.
