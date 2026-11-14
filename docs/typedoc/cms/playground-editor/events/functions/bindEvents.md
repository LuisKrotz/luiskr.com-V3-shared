[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/playground-editor/events](../README.md) / bindEvents

```ts
function bindEvents(ed): void
```

Defined in: cms/playground-editor/events.ts:20

Wires the playground editor — save/locale/add-key single bindings, then
three delegated row groups: `.ep-value` label inputs and `.ep-del`
buttons (keyed by `data-field`), `.slug-value` route-slug inputs, and
the typed defaults (`.ep-def-num` numeric coerced, `.ep-def-bool`
checkboxes). Host methods stay the call path so test spies intercept.

## Parameters

### ed

[`CmsPlaygroundEditor`](../../CmsPlaygroundEditor/classes/CmsPlaygroundEditor.md)

— the CmsPlaygroundEditor exposing `addScopedListener` + `$`/`$$`

## Returns

`void`
