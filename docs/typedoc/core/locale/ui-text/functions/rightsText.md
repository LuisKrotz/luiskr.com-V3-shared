[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/locale/ui-text](../README.md) / rightsText

```ts
function rightsText(): string
```

Defined in: core/locale/ui-text.ts:75

Localized copyright line for the site footers — resolves
`source-code.rights` through the live-then-fallback dictionaries and
substitutes the `{year}` placeholder with the current calendar year so
the stored translation never goes stale.

## Returns

`string`

e.g. 'All rights reserved © Luis Krötz, 2026'
