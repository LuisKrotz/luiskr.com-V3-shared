[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/info](../README.md) / projectHref

```ts
function projectHref(item): string
```

Defined in: website/components/home/cardstack/info.ts:53

Localized destination URL for one project card — the language prefix
rides in front of /portfolio/<slug> on every non-English locale.

## Parameters

### item

[`CardStackItem`](../../types/interfaces/CardStackItem.md)

Project metadata containing the route slug.

## Returns

`string`

Localized portfolio URL, or an empty string without a slug.
