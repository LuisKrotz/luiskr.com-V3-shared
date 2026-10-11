[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [core/utils/string](../README.md) / slugify

```ts
function slugify(text): string;
```

Defined in: core/utils/string.ts:66

Converts a string into a clean, URL-safe and DOM-id-safe slug.
Pipeline: lowercase → drop non-word/non-space/non-dash chars → collapse
whitespace+underscores to `-` → collapse consecutive dashes. e.g.
"METCHA — Leather!" → "metcha-leather". `\w` is ASCII-only
([a-z0-9_]) — accented characters are dropped, which intentionally
mirrors the ASCII-folded LANG_SLUGS convention for URL safety.

## Parameters

### text

`string`

Display text to slug.

## Returns

`string`

URL/id-safe slug, or '' for non-string input.
