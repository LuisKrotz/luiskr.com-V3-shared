# `shared\scripts\i18n\seed-translations.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\seed-translations.js`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

seed-translations.js — pushes new i18n keys to Firebase RTDB
Usage: node scripts/i18n/seed-translations.js
Requires: .firebase-admin-key.json in project root

Unlike the patch-* scripts (which edit the local database.json
mirror first), this one writes keys directly through the Admin SDK
— used when the keys were authored for seeding, not back-patched.
Covered nodes: APP.pref.closeLabel + pref.devTools (developer-tools
labels), APP.carousel (prev/next/of), APP.statsHud (HUD labels).

### (module scope)

`seed` — writes every key in TRANSLATIONS to
translations/<locale>/APP/<node>/<key>. One .set() per key (not a
bulk update) so partial auth failures report per-key, and sibling
keys outside this seed are never touched.
