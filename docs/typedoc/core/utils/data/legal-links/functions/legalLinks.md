[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/data/legal-links](../README.md) / legalLinks

```ts
function legalLinks(): LegalLink[]
```

Defined in: core/utils/data/legal-links.ts:55

Legal-page links for the footer nav — CMS `legal-footer` list preferred,
bundled per-locale fallback when empty. Both lists are filtered through
HAS_LINK so a bare locale-root row (the stored home link) never renders —
the unified footer's right column already carries the home link.

## Returns

[`LegalLink`](../interfaces/LegalLink.md)[]

Validated {link, page} rows.
