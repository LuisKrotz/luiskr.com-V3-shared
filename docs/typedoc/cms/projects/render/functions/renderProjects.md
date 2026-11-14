[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/render](../README.md) / renderProjects

```ts
function renderProjects(host): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/projects/render.tsx:28

Renders the projects case-study manager — header card (create/delete/save),
language + project selectors, then, when a project is selected, the editor:
basic fields, cover image/video config, and the per-section paragraph/media
lists delegated to `renderSection` (one call per section index).

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component holding `currentProject`

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
