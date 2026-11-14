[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/model](../README.md) / removeItem

```ts
function removeItem(host, idx): void
```

Defined in: cms/portfolio/model.ts:77

Deletes the item at `idx` after a label-named confirm — the splice
rewrites indices, so the render+rebind pair refreshes every row's
`data-idx` bindings.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the host component holding `items`

### idx

`number`

— zero-based list index

## Returns

`void`
