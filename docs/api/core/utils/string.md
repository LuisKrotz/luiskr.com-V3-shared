# `core\utils\string.ts`

Small pure string transforms — HTML stripping for

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\string.ts`                                |
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

### `HEADING_EXCERPT_WORDS`

Word budget for a generated a11y heading — enough leading content to
identify the block in a heading list, short enough to stay a label.

### `excerptHeading`

Builds a short heading from a block of content text: markup strips via
the iterated sanitizer, whitespace collapses, and the first
HEADING_EXCERPT_WORDS words are kept with a trailing ellipsis when the
text runs longer — the incipit names the block after its own content
("Joining Dell on June 6th, 2022…") instead of a meaningless ordinal.
Returns '' for empty/non-string input so callers can fall back to a
generic localized label.
Pure ESM utility function, tree-shakeable.

- `@param` text Raw block text (markup tolerated).
- `@returns` Heading excerpt or ''.

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

### `CYRILLIC_SLUG`

Russian Cyrillic → Latin transliteration map for `slugify`. Media
labels exist per locale; without this step a Cyrillic-only caption
(e.g. "фон бренда") would slugify to '' — the deep link would never
be written, emitted, or sitemapped, dropping the item's indexable URL.
Must be copied byte-identically into the build-script slugify twins.

### `slugify`

Converts a string into a clean, URL-safe and DOM-id-safe slug.
Pipeline: NFD-fold diacritics to ASCII → lowercase → transliterate
Cyrillic → trim → collapse every non-alphanumeric run to a single `-`
→ strip edge dashes. e.g. "METCHA — Leather!" → "metcha-leather",
"Cecerelê: tour" → "cecerele-tour", "aboutmarco.com" →
"aboutmarco-com", "фон бренда" → "fon-brenda".
MUST stay byte-identical to the slugify in shared/scripts/build
(generate-sitemap.js + build-locale-pages.mjs): it computes the media
deep-link segment both at runtime (modal write/read) and at build
(emitted pages + sitemap URLs), so the two transforms have to agree
or indexed /portfolio/<p>/<media> links stop auto-opening.

- `@param` text Display text to slug.
- `@returns` URL/id-safe slug, or '' for non-string input.

### `splitDrawSentences`

Splits a paragraph into sentence runs for staged draw-text reveals.
A boundary is terminal punctuation (. ! ? …) followed by whitespace —
mid-word dots without a following space ("Three.js", CDN paths) never
split. The delimiter whitespace is consumed; callers join runs with a
real space node so inline wrapping is preserved. Text with no
boundary returns as a single run; empty input returns [].

- `@param` text Raw paragraph text.
- `@returns` Sentence strings in document order, whitespace-trimmed.

### `mediaSlugSeq`

Assigns the canonical deep-link slug for one media item within a
project's traversal. Distinct captions can collapse to the same slug
("Fórum 2020, Full page" vs "Fórum 2020: Full Page"), which used to
silently drop the second item's indexable URL everywhere. The first
occurrence keeps the base slug; later ones gain `-2`, `-3`, … in
document order — every labelled item stays uniquely addressable.
The base slug is first capped at MEDIA_SLUG_MAX_LENGTH so
prerendered dist paths stay under Windows MAX_PATH — the cap cuts at
the length then drops the trailing partial word (and a dangling
hyphen) so the slug always ends on a hyphen boundary; ordinal suffixes
disambiguate any collisions the cut introduces.
Callers iterate items in traversal order sharing one `seen` map; the
same map/count convention is mirrored in the build scripts
(generate-sitemap.js + build-locale-pages.mjs) so emitted file names,
sitemap <loc>s and runtime resolution agree.

- `@param` seen Per-project base-slug → assigned-count map (mutated).
- `@param` label The item's caption.
- `@returns` The item's unique deep-link slug ('' when unslugifiable).
