[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/locale/cyrillic-font](../README.md) / syncCyrillicFont

```ts
function syncCyrillicFont(lang): void
```

Defined in: core/locale/cyrillic-font.ts:38

Syncs the cyrillic font surface to the active locale: on `ru` the
`cyrillic-font` class flips `--font-primary` to Fira Sans and its
stylesheet is appended to <head>; off `ru` the class is removed so
Fira Sans is never requested. `<html lang>` follows the locale's
BCP-47 tag so assistive tech + crawlers see the real document language.

## Parameters

### lang

`string`

Active locale code (`en`, `br`, `ru`, …).

## Returns

`void`
