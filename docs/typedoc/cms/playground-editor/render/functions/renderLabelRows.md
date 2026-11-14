[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/playground-editor/render](../README.md) / renderLabelRows

```ts
function renderLabelRows(ed): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/playground-editor/render.tsx:42

Key/value rows for the earth-playground page labels — one editable
input + delete button per key; the empty state nudges the editor to
add keys or switch locale. `data-field` carries the key for the
delegated change/remove handlers in `events.ts`.

## Parameters

### ed

[`CmsPlaygroundEditor`](../../CmsPlaygroundEditor/classes/CmsPlaygroundEditor.md)

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
