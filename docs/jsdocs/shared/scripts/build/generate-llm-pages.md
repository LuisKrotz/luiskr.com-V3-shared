# `shared\scripts\build\generate-llm-pages.mjs`

LLM/agent replica surface — emits a full-content Markdown

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\generate-llm-pages.mjs`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `CONTENT_POLICY`

The site's declared AI-usage policy — mirrors the `Content-Signal`
header firebase.json emits on every response and the comment stamp
stamp-content-signal.mjs writes into deployed robots.txt files.

### `decodeEntities`

Decodes the named/numeric entities the CMS copy actually carries.

- `@param` {string} s entity-encoded text
- `@returns` {string} decoded text

### `htmlToMd`

CMS HTML fragment → Markdown text — `<br>` becomes a line break,
anchors keep their href as `[text](url)` (relative hrefs resolve
against the site root so agents get absolute targets), every other
tag unwraps to its text.

- `@param` {string} html CMS HTML fragment
- `@returns` {string} markdown text

### `toDescription`

One-line description for index/meta fields — htmlToMd collapsed to a
single line and capped like the meta-description convention (160).

- `@param` {string} html source text/html
- `@param` {number} [max] character cap
- `@returns` {string} single-line description

### `encUrl`

Percent-encodes a replica URL — docs paths can carry literal
spaces/non-ASCII which make RFC-3986-invalid URLs. decodeURI-first
keeps it idempotent (encodeURI escapes '%' itself).

- `@param` {string} u url path
- `@returns` {string} encoded url

### `frontMatter`

YAML-ish front-matter block — each replica self-describes route,
locale, canonical page and its JSON/MD twins so a standalone file is
fully interpretable without the index.

- `@param` {object} o shell fields
- `@returns` {string} front-matter text

### `mdShell`

Wraps a markdown body in the replica shell — front-matter, H1 and a
trailing alternates/usage footer.

- `@param` {object} o shell fields + `body`
- `@returns` {string} full markdown document

### `jsonShell`

The JSON replica envelope — schema.org-flavoured shell around the
page-type-specific `content` payload.

- `@param` {object} o shell fields + `content` + optional `media`
- `@returns` {object} serializable replica document

### `mediaRecord`

Resolves a CMS media item against the bucket manifest → normalized
media record with the best indexable variant (same variant logic the
sitemap uses).

- `@param` {string} folder project folder prefix
- `@param` {object} m media item
- `@param` {Set<string>} manifest bucket key set (or null)
- `@returns` {object} normalized media record

### `madeDirs`

Directories already created this run — mkdir is the hot syscall at ~76k files.

### `ensureDir`

Ensures a directory exists, once per path per run.

- `@param` {string} dir absolute directory

### `writeReplica`

Writes one replica file under distDir.

- `@param` {string} distDir absolute dist root
- `@param` {string} rel slash-joined path relative to distDir (`llm/en/about.md`)
- `@param` {string} content file bytes
- `@returns` {string} absolute written path

### `linkReplica`

Links (or copies, when hardlinks are unavailable) a canonical replica
to its sibling path so both URLs serve byte-identical content.

- `@param` {string} distDir absolute dist root
- `@param` {string} srcAbs absolute canonical file
- `@param` {string} relDest slash-joined sibling path relative to distDir
- `@returns` {number} 1 (a file was emitted at dest)

### `localized`

Per-locale lookup with English fallback — mirrors the runtime appText
convention and build-locale-pages' `t()`.

- `@param` {object} translations locale → translations map
- `@param` {string} loc locale code
- `@param` {Function} get selector on one locale's translations
- `@returns` {*} selected value (English fallback when empty)

### `replicaAlternates`

Route → hreflang-equivalent map builder — mirrors build-locale-pages'
alternatesFor: every replica lists the _equivalent_ route in every
locale, keyed by locale code with absolute replica-markdown URLs.

- `@param` {Function} pathOf locale → route path (or null when missing)
- `@returns` {object} loc → absolute replica .md URL

### (module scope)

Runs the whole replica fan-out into `distDir`.

- `@param` {string} [distDir] absolute dist path
- `@returns` {Promise<{written: number, routes: number, locales: number}>} emit counts

### `indexRows`

Per-locale index rows accumulated for routes.json + the global index.

### `emit`

Emits one route's md+json pair — canonical write under /llm/, then
hardlinked (copy fallback) siblings at <route>.md/.json — and records
the route in its locale index.

- `@param` {object} o replica shell fields + `body`/`content`/`media`

### `homeMedia`

Home mosaic media — the same covers the sitemap's image tags list.

### `docsFileMd`

Markdown for one docs file node: `.md` sources ship verbatim under
the shell header (the file IS the replica body); code/other formats
are fenced under their extension language so agents get the same
redacted raw text the docs-content JSON serves.

### `docsFileContent`

Raw replica content for one docs file node — mirrors docs-portal's
payloadFor contract: md/json/html/txt pass through verbatim, every
other text format is redacted through redactSource, media nodes ship
the base64 data-URL (or null over MEDIA_INLINE_LIMIT).

### `walk`

Recursive manifest walk — mirrors build-locale-pages' emit().
