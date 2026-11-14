[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/playground-editor/render](../README.md) / renderPlaygroundEditor

```ts
function renderPlaygroundEditor(ed): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/playground-editor/render.tsx:165

Top-level template — header + save, locale picker, then three cards:
playground labels (`_renderLabelRows`), control defaults
(`_renderDefaults`), and localized route slugs (`_renderSlugRows`).

## Parameters

### ed

[`CmsPlaygroundEditor`](../../CmsPlaygroundEditor/classes/CmsPlaygroundEditor.md)

— the CmsPlaygroundEditor hosting the data slices

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
