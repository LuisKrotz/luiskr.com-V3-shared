[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/dialogs/lang-dialog/events](../README.md) / bindEvents

```ts
function bindEvents(host): void
```

Defined in: website/components/dialogs/lang-dialog/events.ts:136

Repositions the follower after each open/re-render and binds the
once-only window + delegated listeners. Option/backdrop/close clicks
are JSX `onClick` props on the rendered buttons — duplicating them
here would fire selectLang/close twice per click.

## Parameters

### host

[`LangDialog`](../../../LangDialog/classes/LangDialog.md)

## Returns

`void`
