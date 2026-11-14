[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/render](../README.md) / renderParagraphList

```ts
function renderParagraphList(host, col): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/about/render.tsx:32

Renders one bio paragraph column as an editable list — each row gets
reorder/remove controls (data-col/data-index drive the delegated event
handlers in `events.ts`) plus a textarea bound to the paragraph HTML.
An "Add Paragraph" button closes the list; used twice by `renderAbout`
for the left (`col1`) and right (`col2`) bio columns.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData`

### col

[`BioColumn`](../../types/type-aliases/BioColumn.md)

— which bio column key (`'col1'` | `'col2'`) to render

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
