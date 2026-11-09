# `shared\scripts\i18n\patch-rss-feed-label.js`

One-shot migration: seeds `APP.rssFeed` — the legal

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\patch-rss-feed-label.js`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `LABELS`

RSS feed link label — writes `APP.rssFeed` (SECTION_UI_KEYS.RSS_FEED)
into every locale so <legal-footer>'s feed link reads in the visitor's
language. "RSS" stays untranslated (it is the format's proper name);
only the noun around it is localized. Dialects follow their own
spelling where one exists (hrk Hunsrik, riv Riverense, tln Talian, gn
Guaraní); `ru` is Cyrillic per the site-wide directive.

Idempotent — re-running rewrites the same leaves. Upload the APP node
to Firebase separately (the live dictionary wins over this snapshot).
