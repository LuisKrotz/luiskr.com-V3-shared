[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/render](../README.md) / renderMentionItems

```ts
function renderMentionItems(host): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/about/render.tsx:105

Renders the awards/mentions list — each item is a card with reorder/
remove controls and three bound inputs (description, link, icon) that
write back through `data-idx`/`data-field` delegation. Mentions are
non-localized (shared across languages), hence no lang suffix here.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData`

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
