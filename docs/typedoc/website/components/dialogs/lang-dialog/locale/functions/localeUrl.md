[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/dialogs/lang-dialog/locale](../README.md) / localeUrl

```ts
function localeUrl(newLang): string
```

Defined in: website/components/dialogs/lang-dialog/locale.ts:29

`localeUrl` — the pure half of a locale switch: resolves the current
route's URL in `newLang` without committing anything. Rendered as the
lang options' `href` so translated routes are real links (crawlable,
open-in-new-tab); `applyLang` pushes the same path on plain clicks.

## Parameters

### newLang

`string`

Target locale code (EN yields the unprefixed root).

## Returns

`string`

The localized path for the current route.
