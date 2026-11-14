[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/render](../README.md) / renderAbout

```ts
function renderAbout(host): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/about/render.tsx:213

Renders the full About-section editor — header card (sync/save actions),
language selector, Gravatar picture/size controls, localized title,
the two bio paragraph columns, and the non-localized mentions list.
This is the top-level template `CmsAboutEditor.render()` delegates to.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component holding `aboutData`

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
