[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/data](../README.md) / projectEntries

```ts
function projectEntries(items, lang): RouteEntry[]
```

Defined in: website/components/search/route-search/data.ts:236

The portfolio half — one `/portfolio/<link>` entry per row in the home
portfoliolist, hydrated with the row's label/description/cover.
Accepts the CMS node in either shape it can arrive (array or keyed
object — Firebase serializes arrays as objects on some paths).

## Parameters

### items

`Record`\<`string`, `PortfolioRow`\> \| `PortfolioRow`[] \| `null` \| `undefined`

Raw portfoliolist rows.

### lang

`string`

Current locale code.

## Returns

[`RouteEntry`](../interfaces/RouteEntry.md)[]

Project route entries in list order.
