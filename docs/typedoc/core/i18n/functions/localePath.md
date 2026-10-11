[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [core/i18n](../README.md) / localePath

```ts
function localePath(key, lang?): string;
```

Defined in: core/i18n.ts:127

Builds a localized URL for a route key ('about', 'privacy', …).
English paths stay un-prefixed (/about); other locales get
/<lang>/<localized-slug>. Unknown keys fall back to the raw key —
`localePath('portfolio/x', 'fr')` → `/fr/portfolio/x`.

## Parameters

### key

`string`

route key matching a LANG_SLUGS field, or a raw slug

### lang?

`string` = `LOCALES.EN`

locale code

## Returns

`string`

absolute path
