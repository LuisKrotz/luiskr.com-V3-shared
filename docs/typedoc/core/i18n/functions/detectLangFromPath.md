[**luiskr.com**](../../../README.md)

***

[luiskr.com](../../../README.md) / [core/i18n](../README.md) / detectLangFromPath

```ts
function detectLangFromPath(pathname): string;
```

Defined in: core/i18n.ts:105

Extracts the locale segment from a URL path; defaults to English when
the first segment isn't a valid locale code. `/de/ueber` → 'de',
`/about` → 'en' (English is the un-prefixed default).

## Parameters

### pathname

`string`

`location.pathname`

## Returns

`string`

locale code from LOCALES
