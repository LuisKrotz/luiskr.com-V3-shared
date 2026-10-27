# `shared\scripts\build\route-media.mjs`

Route media helpers shared by the build-time generators

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\route-media.mjs`              |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `LLM_TREE_ROOT`

Root every build-time .md/.json replica lives under in the mirror tree.

### `LOCALE_PREFIX_RE`

Locale-prefixed path detector — built from the actual locale codes so
single-word routes like /docs/* or /gdpr are never mistaken for a
locale prefix. Same construction generate-sitemap.js uses.

### `CYRILLIC_SLUG`

Russian Cyrillic → Latin transliteration — Cyrillic media labels would
otherwise slugify to '' and lose their deep-link URL. MUST stay
byte-identical to CYRILLIC_SLUG in core/utils/string.ts.

### `slugify`

Media-slug transform — diacritics fold to ASCII, Cyrillic transliterates,
every non-alphanumeric run collapses to a single hyphen. MUST match the
slugify inside core/utils/string.ts byte for byte so emitted URLs and
the runtime resolver agree.

- `@param` {string} text raw label text
- `@returns` {string} slugified base

### `capSlug`

Caps a media deep-link slug at MEDIA_SLUG_MAX_LENGTH so prerendered
dist paths stay under Windows MAX_PATH — the cut drops the trailing
partial word (and a dangling hyphen) so the slug always ends on a
hyphen boundary. Byte-identical to the cap in mediaSlugSeq
(core/utils/string.ts) so sitemap <loc>s, emitted pages, .md/.json
replicas and the runtime resolver agree.

- `@param` {string} base slugified base
- `@returns` {string} capped slug

### `mediaItemsOf`

Media items of a project — mirrors `website/views/project/modal.ts`'s
traversal exactly: sections → groups (arrays whose head is NOT a
string — string-head groups are text blocks) → media objects. Every
object with a `src` is a real asset on the page; items with a label
additionally get their own `/portfolio/<slug>/<media>` deep-link URL.
Non-array section/group entries are tolerated (defensive wrap) so a
malformed row cannot kill a whole build fan-out.

- `@param` {object} project project record (`sections` payload)
- `@returns` {object[]} flattened media objects in document order

### `mediaRowsOf`

Labelled-media deep links of a project — `[{ slug, label, media }]`.
Distinct captions can collapse to the same slug, so occurrences after
the first gain `-2`, `-3`, … in document order — byte-identical to
mediaSlugSeq in core/utils/string.ts so every item keeps an indexable
URL and emitted pages + the runtime resolver agree.

- `@param` {object} project project record (`sections` payload)
- `@returns` {{slug: string, label: string, media: object}[]} deep-link rows

### `llmTreePaths`

`/llm/` mirror-tree paths for a route — the convention
generate-llm-pages.mjs emits: `/<loc>`-prefixed routes map to
`/llm/<loc>/<rest>` and unprefixed (English-only) routes map to
`/llm/en/<path>`, with `/` and `/<loc>` landing on `index`. Each page's
emitted <link rel="alternate"> tags point agents at these files.

- `@param` {string} pathname canonical route path (`/br/sobre`, `/docs/src/x`)
- `@returns` {{base: string, md: string, json: string}} tree path trio

### `llmSiblingPaths`

Sibling replica paths — the same replica reachable next to the page's
own URL (`/portfolio/x` → `/portfolio/x.md` + `.json`). Locale roots
(`/<loc>`) land on `index` so the whole tree uses one naming rule.

- `@param` {string} pathname canonical route path
- `@returns` {{base: string, md: string, json: string}} sibling path trio
