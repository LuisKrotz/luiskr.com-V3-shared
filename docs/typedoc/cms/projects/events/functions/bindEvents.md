[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/projects/events](../README.md) / bindEvents

```ts
function bindEvents(host): void
```

Defined in: cms/projects/events.ts:24

Binds the projects editor's events — header buttons, the lang/project
selectors, then (only when a project is loaded) the scalar fields, and
finally the per-row controls on each section card. Row controls carry
`data-idx` (section index), `data-sec` + `data-tidx`/`data-midx` attrs
read here to route the write into `proj.sections[s][0|1][i]` — the
`[texts, media]` tuple shape `sections.ts` normalizes. Scoped
listeners auto-detach on re-render so re-binding per render is intended.

## Parameters

### host

[`CmsProjectsList`](../../CmsProjectsList/classes/CmsProjectsList.md)

— the host component exposing `addScopedListener` + `$`/`$$`

## Returns

`void`
