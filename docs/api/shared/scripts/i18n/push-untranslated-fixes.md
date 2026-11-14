# `shared\scripts\i18n\push-untranslated-fixes.js`

Pushes the corrected (newly translated) leaves of

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\i18n\push-untranslated-fixes.js`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `fetchLive`

GETs a public RTDB node as JSON (translations are world-readable).

### `push`

Writes `data` to `rtdbPath`. With an OAuth2 token this PUTs through
the RTDB REST API directly (equivalent to database:set — replaces
exactly the node); otherwise it falls back to the Firebase CLI via a
temp file (database:set takes a file path, not stdin).

### `collect`

Recursively collects the pushes for one locale. Two cases write:

1. `liveLoc` absent → the WHOLE local subtree pushes at `pre` in a
   single write (shallowest missing node, same convention as
   upload-missing-translations.js — descending would multiply leaf
   writes for nothing).
2. Scalar leaf where `liveLoc === liveEn` (the live locale still
   holds the English string verbatim — a provably stale untranslated
   copy) but `local !== liveEn` → the corrected mirror value pushes.

Arrays walk by index — live and local lists are position-aligned
(verified against portfoliolist/links/line2), so a stale field inside
an item pushes alone and a missing tail index uploads whole. Anything
already diverging from English in live is never touched — live CMS
edits stay authoritative. Under `--parity` that safeguard lifts: a
differing array replaces wholesale (element-wise writes can't drop a
longer live tail) and any differing scalar pushes the mirror value.
