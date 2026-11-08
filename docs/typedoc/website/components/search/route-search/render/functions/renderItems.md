[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/render](../README.md) / renderItems

```ts
function renderItems(entries, active): HTMLElement[]
```

Defined in: website/components/search/route-search/render.tsx:99

`renderItems` — one `<li role=option>` per hit: numbered index pill,
title + preview + path body, circular ring-fill go button. The anchor
wraps the row so plain clicks navigate natively and modified clicks
keep new-tab semantics.

## Parameters

### entries

[`RouteEntry`](../../data/interfaces/RouteEntry.md)[]

Ranked entries to render.

### active

`number`

Index of the keyboard/hover-active row (-1 none).

## Returns

`HTMLElement`[]

Array of li elements for the listbox.
