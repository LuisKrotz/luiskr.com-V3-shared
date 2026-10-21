[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/public/wasm/markdown/luiskr\_markdown](../README.md) / markdown\_to\_html

```ts
function markdown_to_html(source): string
```

Defined in: website/public/wasm/markdown/luiskr\_markdown.d.ts:30

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

## Parameters

### source

`string`

The Markdown source text.

## Returns

`string`

The rendered HTML string.
