[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/about/events](../README.md) / bindEvents

```ts
function bindEvents(host): void
```

Defined in: cms/about/events.ts:21

Binds the About editor's events — two binding helpers then one block per
UI region. `on` attaches a scoped listener to a single matching element;
`all` iterates every match (row-level controls rendered per item carry
`data-col`/`data-idx`/`data-field` attrs read here to route the write).
Scoped listeners auto-detach on re-render so re-binding after each
render is the intended lifecycle.

## Parameters

### host

[`CmsAboutEditor`](../../CmsAboutEditor/classes/CmsAboutEditor.md)

— the host component exposing `addScopedListener` + `$`/`$$`

## Returns

`void`
