[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/section-render](../README.md) / renderSection

```ts
function renderSection(host, sec, sIdx, total): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/projects/section-render.tsx:33

Renders one editable project-section card — a header with reorder/remove
controls, then two subsections: the paragraph textareas and the media
rows (thumbnail + filename/label/type/width/height + remove).
`normalizeSection` splits the mixed section array into parallel
`texts`/`media` lists; `data-sec` + `data-tidx`/`data-midx` let the
delegated handlers in `events.ts` write back to the right slot.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component (folder prefix for `gcs` thumbnails)

### sec

[`CmsSection`](../../types/type-aliases/CmsSection.md)

— the section model (mixed text/media array)

### sIdx

`number`

— zero-based section index

### total

`number`

— total section count (disables "down" on the last card)

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
