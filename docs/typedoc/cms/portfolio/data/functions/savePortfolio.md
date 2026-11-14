[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/data](../README.md) / savePortfolio

```ts
function savePortfolio(host): Promise<void>
```

Defined in: cms/portfolio/data.ts:180

Persists the current locale's portfolio list to Firebase, then runs the
related-projects featured sync so the case-study footer flags agree.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the host component holding `items` + `selectedLang`

## Returns

`Promise`\<`void`\>
