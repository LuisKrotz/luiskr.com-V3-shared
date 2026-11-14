[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/mermaid](../README.md) / renderMermaidBlocksForPrint

```ts
function renderMermaidBlocksForPrint(container): Promise<void>
```

Defined in: experiments/docs/mermaid.ts:227

Re-renders every `.docs-mermaid` block inside the print mirror with
the paper theme — the mirror clone carries either the screen-palette
SVG (processed blocks, source stashed in `data-mermaid-src`) or the
raw source text (a print fired mid-render), and neither belongs on
paper as-is. Blocks whose source can't render keep whatever they
cloned — the escaped source text still reads as documentation.

## Parameters

### container

`HTMLElement`

The `article.reader-content` mirror (or clone) to
upgrade in place.

## Returns

`Promise`\<`void`\>
