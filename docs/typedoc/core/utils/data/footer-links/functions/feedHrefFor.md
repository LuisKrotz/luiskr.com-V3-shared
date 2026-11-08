[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/data/footer-links](../README.md) / feedHrefFor

```ts
function feedHrefFor(locale): string
```

Defined in: core/utils/data/footer-links.ts:38

Locale RSS feed URL — `/feed.xml` for English, `/<loc>/feed.xml`
otherwise; both are firebase rewrites onto the generated meta feeds.

## Parameters

### locale

`string`

active locale code

## Returns

`string`

root-relative feed path for that locale
