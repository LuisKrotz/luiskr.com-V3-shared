[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/render](../README.md) / renderShell

```ts
function renderShell(strings): HTMLElement
```

Defined in: website/components/search/route-search/render.tsx:27

`renderShell` — the one-time skeleton: field pill + input combobox,
an empty results listbox, and the no-match row. Per-render state
(placeholder/labels) is applied imperatively by the facade so the
input never loses focus.

## Parameters

### strings

[`SearchStrings`](../../data/interfaces/SearchStrings.md)

Localized copy node.

## Returns

`HTMLElement`

The shell root element.
