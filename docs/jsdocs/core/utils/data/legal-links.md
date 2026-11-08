# `core\utils\data\legal-links.ts`

Builds the bundled legal link list (home / privacy / GDPR /

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\data\legal-links.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

A legal footer entry: localized path + human label.

### (module scope)

A CMS-stored link row — both fields optional at the data boundary.

### `HAS_LINK`

Bare locale-root matcher ('/', '/en/', '/pt/') — the CMS stores the home
link in the same list, but the footer nav must only show real legal pages.

### `isLegalPageLink`

Type guard verifying that a link row has both a destination and a page
label, and is not a bare locale-root home entry.

- `@param` l Candidate link entry.
- `@returns` True when `l` is a valid non-root legal page link.

### `legalLinks`

Legal-page links for the footer nav — CMS `legal-footer` list preferred,
bundled per-locale fallback when empty. Both lists are filtered through
HAS_LINK so a bare locale-root row (the stored home link) never renders —
the unified footer's right column already carries the home link.

- `@returns` Validated {link, page} rows.

### `getFallbackLegalLinks`

Gets fallback legal links.

- `@param` locale — the locale
- `@returns` LegalLink[]
