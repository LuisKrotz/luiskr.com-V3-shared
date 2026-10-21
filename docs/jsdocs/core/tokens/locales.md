# `core\tokens\locales.ts`

Supported language locales for i18n routing and CMS data

| | |
|---|---|
| **Source** | `src/core\tokens\locales.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `LOCALE_TAGS`

Locale code → metadata tags. `bcp` is the BCP-47 tag used in `hreflang`,
`<html lang>` and JSON-LD `inLanguage`; `og` is the xx_YY form
`og:locale` requires. Dialects without a standardized region keep their
ISO-639-3 tag and map og:locale to the closest standardized culture.
Sole declaration site — the static-page generator imports this file so
runtime head sync and emitted HTML can never diverge.
