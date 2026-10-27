[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/render](../README.md) / renderContent

```ts
function renderContent(text, delay, offset, mode?): string
```

Defined in: website/components/media/draw-text/render.ts:357

Full pipeline: text → tokens → HTML string. The `wi` closure counter
assigns each rendered word a sequential index so the word-level
cascade (`--wi`/`--word-delay`) staggers in reading order, including
words nested inside tags. Empty input returns "" rather than a stub
span tree.

## Parameters

### text

`string`

Raw text (may contain <br> and inline tags).

### delay

`number`

Per-char stagger delay in ms.

### offset

`number`

Base delay offset in ms.

### mode?

[`DrawRenderMode`](../type-aliases/DrawRenderMode.md) = `RENDER_MODES.CHARS`

Which render to emit — 'chars' mounts the animating char
spans, 'words' mounts measureable word spans (the `fit` fallback),
'plain' collapses text into per-run aria-hidden spans (default for
pending/done — O(paragraphs) nodes, not O(words)).

## Returns

`string`

The assembled HTML string.
