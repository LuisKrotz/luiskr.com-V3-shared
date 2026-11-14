[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/render](../README.md) / renderPortfolioList

```ts
function renderPortfolioList(host): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/portfolio/render.tsx:273

Renders the full portfolio manager — header (add / sync-to-all-languages /
save), language picker, then either the item card list (`renderItem`
per entry) or an empty-state card prompting creation.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the CmsPortfolioList hosting the items slice

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
