# `shared/scripts/i18n/patch-ui-gaps-and-cyrillic.js`

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/i18n/patch-ui-gaps-and-cyrillic.js`                   |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `PATCH`

Patches the remaining untranslated UI gaps across all locales — the
leaves that were still holding English values (legal-footer links,
featured label, docs-portal strings, pref labels, OFF toggle, star-field
vocabulary for tln) — and transliterates every name/label to Cyrillic
for `ru` per the "all names in Cyrillic" directive.

Keys are dot-paths into db.translations[locale]; array indexes are
numeric segments. Only listed paths are written — everything else is
left untouched. Cognates that are already correct in the target
language (e.g. "Normal" in pt/es/de, "Contact" in fr/nl) are
intentionally absent.

### `setPath`

Sets `obj`'s leaf at a dot-path, creating intermediate containers.
