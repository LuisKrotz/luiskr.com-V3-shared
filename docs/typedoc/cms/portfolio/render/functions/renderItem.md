[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/render](../README.md) / renderItem

```ts
function renderItem(host, item, idx): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/portfolio/render.tsx:35

Renders one portfolio item card — identity row (thumbnail + numbered
title + reorder/delete controls), then the field groups: localized
label/description, non-localized slug/image/featured, and the 4-cell
desktop/mobile width×height dimension grid. `data-idx`/`data-field`/
`data-prop`/`data-dim-idx` drive the delegated write-backs in
`events.ts`; dimension arrays are `[desktop, mobile]` pairs.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the host component (for image preview + items length)

### item

[`PortfolioItem`](../../types/interfaces/PortfolioItem.md)

— the portfolio item model slice

### idx

`number`

— zero-based position in the list (controls + data attrs)

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
