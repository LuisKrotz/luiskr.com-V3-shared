[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/playground-editor/render](../README.md) / renderDefaults

```ts
function renderDefaults(ed): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/playground-editor/render.tsx:84

Control-defaults rows — the input type is chosen from the stored value
type (boolean → checkbox toggle, number → numeric input) so the
defaults object stays schema-free. These seed the playground's panel
controls until a visitor's own overrides take over.

## Parameters

### ed

[`CmsPlaygroundEditor`](../../CmsPlaygroundEditor/classes/CmsPlaygroundEditor.md)

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
