[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/render](../README.md) / renderItems

```ts
function renderItems(entries, active, strings, offset?): HTMLElement[]
```

Defined in: website/components/search/route-search/render.tsx:160

`renderItems` — one `<li role=option>` per hit: numbered index pill,
title + preview + path body, circular ring-fill go button. The anchor
wraps the row so plain clicks navigate natively and modified clicks
keep new-tab semantics. Kind-ordered entries get a `role=group`
header row at each kind boundary — the first row of a page always
emits one so a mid-group page still names its bucket.

## Parameters

### entries

[`RouteEntry`](../../data/interfaces/RouteEntry.md)[]

Ranked entries to render (one results page).

### active

`number`

Index of the keyboard/hover-active row (-1 none).

### strings

[`SearchStrings`](../../data/interfaces/SearchStrings.md)

Resolved copy node — supplies the group labels.

### offset?

`number` = `0`

Global rank of the page's first row (index pill base).

## Returns

`HTMLElement`[]

Array of li elements for the listbox.
