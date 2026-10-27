# `website\public\wasm\markdown\luiskr_markdown.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\markdown\luiskr_markdown.js`   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `markdown_to_html`

`markdown_to_html` — parse a Markdown source string and return the
HTML, GFM-flavored (tables, strikethrough, tasklists, bare-URL
autolinks — the `marked.use({ gfm: true })` bundle).

# Extensions

- `ENABLE_TABLES` — pipe tables, the `| a | b |` + `|---|---|`
  delimiter form marked renders into `<table><thead><tbody>`.
- `ENABLE_STRIKETHROUGH` — `~~gone~~` → `<del>`.
- `ENABLE_TASKLISTS` — `- [ ] item` → `<li><input disabled
type="checkbox">`.

Plus the event-stream bare-URL autolinker above — marked's gfm
autolink parity that pulldown's `ENABLE_GFM` flag doesn't cover
(it gates `[!NOTE]` blockquote alerts instead, which marked never
produced, so that flag stays OFF for parity).

Footnotes, smart punctuation, math, superscript/subscript,
wikilinks, and heading attributes stay OFF — marked never enabled
them, so enabling them here would silently change output for
syntax that previously rendered as literal text.

- `@param` source The Markdown source text.
- `@returns` The rendered HTML string.
- `@param` {string} source
- `@returns` {string}
