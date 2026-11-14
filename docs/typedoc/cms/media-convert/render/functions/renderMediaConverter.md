[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/media-convert/render](../README.md) / renderMediaConverter

```ts
function renderMediaConverter(host): Element
```

Defined in: cms/media-convert/render.tsx:300

Top-level template — gates non-localhost renders to a notice card
(the conversion API only exists on the dev server), then the title
card, the toolchain setup panel, and the phase switch
(idle/uploading/converting/done/error) with a busy spinner row for
the two in-flight phases.

## Parameters

### host

[`CmsMediaConverter`](../../CmsMediaConverter/classes/CmsMediaConverter.md)

— the host component exposing `phase` + per-phase renders

## Returns

[`Element`](../../../../shared/src/globals/namespaces/JSX/type-aliases/Element.md)
