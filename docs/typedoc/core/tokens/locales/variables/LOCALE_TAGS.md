[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/tokens/locales](../README.md) / LOCALE\_TAGS

```ts
const LOCALE_TAGS: Readonly<
  Record<
    string,
    Readonly<{
      bcp: string
      og: string
    }>
  >
>
```

Defined in: core/tokens/locales.ts:47

Locale code → metadata tags. `bcp` is the BCP-47 tag used in `hreflang`,
`<html lang>` and JSON-LD `inLanguage`; `og` is the xx_YY form
`og:locale` requires. Dialects without a standardized region keep their
ISO-639-3 tag and map og:locale to the closest standardized culture.
Sole declaration site — the static-page generator imports this file so
runtime head sync and emitted HTML can never diverge.
