[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/data](../README.md) / loadLangPortfolio

```ts
function loadLangPortfolio(host): Promise<void>
```

Defined in: cms/portfolio/data.ts:48

Loads the portfolio list + the `related/projects` node for the selected
locale — the related map back-fills `featured` for legacy items that
predate the flag on the list itself, and missing dimension arrays get
the FHD-width / mosaic-height token defaults.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the host component whose `items` slice is filled

## Returns

`Promise`\<`void`\>
