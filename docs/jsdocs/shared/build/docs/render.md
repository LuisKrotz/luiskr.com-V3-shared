# `shared\build\docs\render.mjs`

Build-time file → HTML renderers for the docs portal.

| | |
|---|---|
| **Source** | `src/shared\build\docs\render.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `REPO`

Repo root — same `fileURLToPath(new URL('../..', …))` convention as
`shared/build/module-public.mjs`, one level deeper for docs/.

### `escapeHtml`

HTML-escapes a text fragment for inclusion in markup or <pre>.

### `slugify`

GitHub-style slug for a heading: lowercase, spaces → '-', strip anything
that isn't a word char, '-', or space. Matches GitHub's anchor scheme so
intra-document links keep working.

### `renderMarkdown`

Full markdown → HTML via the Rust `markdown` wasm artifact
(pulldown-cmark with the same GFM surface `marked` exposed: tables,
task lists, fenced code, strikethrough, autolinks). A post-pass adds
`id` anchors to headings the same way GitHub does, normalizes the
void-element ` />` closers pulldown emits to marked's `>` form, and
adds `loading="lazy"` to images.

### `JSON_DEPTH_CAP`

Recursion cap — beyond it a nested value renders as a bounded <pre>.

### `JSON_ROW_CAP`

Row cap per object/array — the remainder collapses to a "+N more" line.

### `JSON_COL_CAP`

Column cap for object-array tables (union of keys, first-N order).

### `JSON_PCT_KEY`

Keys whose numeric value is a percentage → rendered with a meter bar.

### `isJsonObject`

Non-array object check for the JSON tree walk.

### `renderJsonScalar`

One JSON scalar → typed markup. Numbers under a pct-like key render as a
progress meter so coverage summaries read as dashboards, not dumps;
URLs become links; the rest gets a type-tagged span.

### `jsonNestBadge`

Nested container → a count badge inside table cells (keeps rows tight).

### `renderJsonArray`

Arrays → a real table when every row is a flat object (the report-row
shape — axe violations, snyk entries), otherwise an ordered value list.

### `renderJsonCellGroup`

A flat grandchild (all-scalar object) → compact inline `key value` pairs
for pivot cells — the coverage group shape (total/covered/skipped/pct)
stays on one readable line instead of nesting a dl inside a td.

### `renderJsonPivot`

Uniform object-of-objects → a pivot table: outer keys become row headers,
the shared inner keys become columns, scalar grandchildren become typed
cells and flat groups compact stat pairs. This is the coverage-summary
shape (file → lines/statements/functions/branches → numbers) — a table
reads far better than a vertical ladder of nested definition lists.
Returns null when the shape is not uniform so callers fall back to <dl>.

### `renderJsonObject`

Objects → key/field rows; nested objects recurse into their own section
so a coverage-summary reads file → metrics → numbers instead of braces.
Uniform report objects pivot into a real table first.

### `renderJsonValue`

Value dispatcher — scalars inline, containers recursive, depth-capped.

### `renderJson`

JSON → parsed, structured markup: real numbers, key/field rows and
tables — never a raw dump. Unparseable input falls back to escaped text.

### `LANG_BY_EXT`

Language-id map for the code <pre> class — display label only.

### `sanitizeHtmlDoc`

Sanitizes a full HTML document for inline rendering inside the portal
viewer's shadow root. Keeps every `<style>` block (they only reach the
shadow tree, so a report's own look survives without leaking into the
page chrome) and keeps the document's markup so it inherits the
project's CSS variables + the viewer's generic element styles.

Removed:
  - `<script>` / `<noscript>` — noscript blocks are what surfaced the
    "requires JavaScript" fallback text inside the sandboxed iframe.
  - `<iframe>/<object>/<embed>` — no nested browsing contexts.
  - `<base>` / `<meta>` / `<link>` — no navigation or external fetches.
  - `on*` event-handler attributes — defense in depth on top of the
    build-time trust boundary.

### `renderFile`

Dispatches a file to the right renderer.
- `@param` {string} format        Format tag emitted by scan.mjs.
- `@param` {string} content       Raw file text.
- `@param` {string} ext           Lower-cased extension without the dot.
- `@param` {object} [opts]        Optional: `linkResolver(href)` → CSS text
- `@returns` {string} Rendered markup, safe for the viewer's innerHTML paint.
