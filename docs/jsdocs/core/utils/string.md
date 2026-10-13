# `core/utils/string.ts`

Small pure string transforms — HTML stripping for

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core/utils/string.ts`                                |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `stripHtml`

Strips HTML tags iteratively to prevent malformed or nested tags from leaking.
A single `replace(/<[^>]*>/)` pass can leave a reconstructed tag behind
(input like `<scr<script>ipt>` collapses into `<script>`), so the loop
re-runs until the string is stable — this is the classic "iterated
sanitization" defense: each pass may expose a tag assembled from
fragments of the previous pass.
Pure ESM utility function, tree-shakeable.

- `@param` str Raw markup-bearing text.
- `@returns` Text with every `<…>` span removed.

### `META_DESCRIPTION_MAX`

Meta descriptions cap at ~160 chars — Google's SERP snippet budget.

### `toMetaDescription`

Compacts markup-bearing CMS text into a meta-description string:
`<br>` collapses to a space (it is a line break, not a word boundary),
remaining tags strip via the iterated sanitizer, named/numeric entities
decode so `&nbsp;` doesn't survive into the content attribute, runs of
whitespace collapse to one space, and overlong text cuts at the last
word boundary inside `max` — never mid-word.
Pure ESM utility function, tree-shakeable.

- `@param` str Raw CMS text (may contain tags/entities).
- `@param` max Character budget — defaults to the SERP limit.
- `@returns` Plain-text description ≤ max chars.

### `escapeHtml`

Escapes HTML-significant characters for safe insertion into innerHTML or
double-quoted attributes. `&` must be replaced first so the entities
emitted by the later replacements are not double-escaped.
Pure ESM utility function, tree-shakeable.

- `@param` {string} str — raw text that may contain &, <, >, ", '
- `@returns` {string} entity-escaped text safe for markup contexts

### `slugify`

Converts a string into a clean, URL-safe and DOM-id-safe slug.
Pipeline: NFD-fold diacritics to ASCII → lowercase → trim → collapse
every non-alphanumeric run to a single `-` → strip edge dashes. e.g.
"METCHA — Leather!" → "metcha-leather", "Cecerelê: tour" →
"cecerele-tour", "aboutmarco.com" → "aboutmarco-com".
MUST stay byte-identical to the slugify in shared/scripts/build
(generate-sitemap.js + build-locale-pages.mjs): it computes the media
deep-link segment both at runtime (modal write/read) and at build
(emitted pages + sitemap URLs), so the two transforms have to agree
or indexed /portfolio/<p>/<media> links stop auto-opening.

- `@param` text Display text to slug.
- `@returns` URL/id-safe slug, or '' for non-string input.
