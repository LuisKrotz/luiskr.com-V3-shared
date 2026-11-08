# `shared\scripts\build\generate-search-index.mjs`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\generate-search-index.mjs`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `stripHtml`

stripHtml — CMS descriptions carry markup; previews are plain text.

### `firstText`

`firstText` — first plain-text paragraph inside a project's sections.

### `truncate`

`truncate` — previews cap at 160 chars on a word boundary.

### `titleCase`

`titleCase` — a slug segment becomes a display title fallback.

### `sitemapPaths`

Load a locale's sitemap paths (relative, decoded).

### `starBody`

Star-body display data — `name`/`tagline` per body file (en fallback).

### `classify`

`classify` — resolves a sitemap path into {t,d,k,c} for `loc`:
home, static pages (slugs), portfolio project, media deep link,
star-field body, docs path. `c` carries the ROUTE_SEARCH_KINDS
bucket the runtime groups the hit under.

### `isDocsPath`

`/docs/…` route test — shared by the per-locale filter + the docs artifact.

### `DOC_READ_CAP`

Largest file read for keyword extraction — past it the row keeps path words only.

### `DOC_KW_CAP`

Keyword blob budget per file — bounds the shipped docs artifact.

### `HASH_COMMENT_EXTS`

Extensions whose `#` lines are real comments (shell/config families).

### `MARKUP_COMMENT_EXTS`

Code extensions whose `<!-- -->` blocks are real comments.

### `codeComments`

Comment-only text pull for code files — the searchable surface the
"comment" requirement names. Which comment syntax applies follows the
extension family: `//`/`/*…*‌/` cover the C-style languages (and
incidentally SCSS line comments), `#` the shell/config families,
`<!-- -->` the markup files.

### `extractText`

Format-aware text pull per file — markdown front-loads its headings
(they carry the topical words before the cap bites), html strips tags,
json keeps key names, code keeps comments (redacted first, same
scrubbing the portal payload gets). Media files contribute nothing —
their stem/path keywords already cover the "diagram" match.

### `docBlob`

File → normalized keyword blob: unique word tokens (3–48 chars)
joined until the DOC_KW_CAP budget runs out. Shipped as ONE keyword
string — the scorer's `kw.includes(term)` turns it into a substring
match against the document's own vocabulary.

### `docsEntries`

Docs-portal routes — every manifest file leaf becomes a `/docs/<root>/<rel>`
entry, enriched with the file's own keyword blob so content terms
(text, comments, diagram code) reach the matcher in every locale.

### `docsIndex`

The shared docs artifact — every `/docs/*` route the sitemap lists
(portal root + dir pages) unioned with the enriched manifest file
leaves. Dedupe is by path with the manifest row winning: it carries
the better title (generic stems fold to their parent folder) and the
content blob. One file serves all 16 locales — the corpus is
English-only, so it never joins the per-locale indexes.
