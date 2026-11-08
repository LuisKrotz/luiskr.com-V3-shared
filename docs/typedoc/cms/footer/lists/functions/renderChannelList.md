[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [cms/footer/lists](../README.md) / renderChannelList

```ts
function renderChannelList(
  host,
  arr,
  prefix,
  addFn,
  labelField?,
  extraField?
): HTMLElement | DocumentFragment | SVGElement
```

Defined in: cms/footer/lists.ts:59

One editable channel list: label input + link/URL input + move/delete
controls per row. `prefix` namespaces every class (line1-_, legal-_,
social-*) so bindListEvents can bind by convention; `labelField`
picks which property holds the row label ('description' for contact
channels, 'page' for legal links, 'network' for socials) — matching
each DB shape exactly. `extraField` adds an optional third input bound
to that property (contact line-1 'caption').

## Parameters

### host

[`CmsFooterEditor`](../../CmsFooterEditor/classes/CmsFooterEditor.md)

### arr

[`FooterChannel`](../../types/interfaces/FooterChannel.md)[]

### prefix

`string`

### addFn

`string`

### labelField?

`string` = `CMS_FIELD_KEYS.DESCRIPTION`

### extraField?

`string`

## Returns

`HTMLElement` \| `DocumentFragment` \| `SVGElement`
