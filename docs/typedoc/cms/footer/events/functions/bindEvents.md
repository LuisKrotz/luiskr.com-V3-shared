[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/footer/events](../README.md) / bindEvents

```ts
function bindEvents(host): void
```

Defined in: cms/footer/events.ts:21

Wires the whole footer form — header buttons (save + the two
cross-locale syncs), the language selector and scalar title/disclaimer
inputs, then the four channel lists, each bound via `_bindListEvents`
with the prefix + label-field convention matching its DB shape
(`line1` channels carry an extra caption field; legal uses `page`;
socials use `network`).

## Parameters

### host

[`CmsFooterEditor`](../../CmsFooterEditor/classes/CmsFooterEditor.md)

— the CmsFooterEditor hosting the data slices

## Returns

`void`
