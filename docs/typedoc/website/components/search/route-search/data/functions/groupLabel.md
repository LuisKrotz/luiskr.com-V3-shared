[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/search/route-search/data](../README.md) / groupLabel

```ts
function groupLabel(strings, kind): string
```

Defined in: website/components/search/route-search/data.ts:484

`groupLabel` — a kind's bucket header text. Localized labels come from
the CMS search copy node; the docs bucket always resolves to the
English-only DOCS_STRINGS.SEARCH_GROUP_LABEL token (the corpus exists
only in English, so the label names that in every locale).

## Parameters

### strings

[`SearchStrings`](../interfaces/SearchStrings.md)

Resolved search copy node.

### kind

`string`

The entry kind whose header is needed.

## Returns

`string`

The group header text ('' for undeclared kinds).
