[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/string](../README.md) / slugify

```ts
function slugify(text): string
```

Defined in: core/utils/string.ts:183

Converts a string into a clean, URL-safe and DOM-id-safe slug.
Pipeline: NFD-fold diacritics to ASCII → lowercase → transliterate
Cyrillic → trim → collapse every non-alphanumeric run to a single `-`
→ strip edge dashes. e.g. "METCHA — Leather!" → "metcha-leather",
"Cecerelê: tour" → "cecerele-tour", "aboutmarco.com" →
"aboutmarco-com", "фон бренда" → "fon-brenda".
MUST stay byte-identical to the slugify in shared/scripts/build
(generate-sitemap.js + build-locale-pages.mjs): it computes the media
deep-link segment both at runtime (modal write/read) and at build
(emitted pages + sitemap URLs), so the two transforms have to agree
or indexed /portfolio/<p>/<media> links stop auto-opening.

## Parameters

### text

`string`

Display text to slug.

## Returns

`string`

URL/id-safe slug, or '' for non-string input.
