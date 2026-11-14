[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/portfolio/events](../README.md) / bindEvents

```ts
function bindEvents(host): void
```

Defined in: cms/portfolio/events.ts:23

Binds the portfolio list's events — header buttons (add/sync/save), the
language selector, then three delegated row-level groups: `data-action`
buttons (up/down/delete), `.item-field` inputs (label/link/image/
description write-back), `.dim-field` inputs (width/height ×
desktop/mobile slots via `data-prop`/`data-dim-idx`), and the featured
select. Scoped listeners detach on re-render; binding per render is
the intended lifecycle.

## Parameters

### host

[`CmsPortfolioList`](../../CmsPortfolioList/classes/CmsPortfolioList.md)

— the host component exposing `addScopedListener` + `$`/`$$`

## Returns

`void`
