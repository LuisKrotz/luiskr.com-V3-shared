[**luiskr.com**](../../../../README.md)

***

[luiskr.com](../../../../README.md) / [experiments/docs/mermaid](../README.md) / renderMermaidBlocks

```ts
function renderMermaidBlocks(container): Promise<void>;
```

Defined in: experiments/docs/mermaid.ts:58

Renders every unprocessed `.docs-mermaid` block inside `container`
into an inline SVG diagram. Safe to call repeatedly — mermaid marks
processed nodes (`data-processed`), so later payloads don't re-render
earlier diagrams.

## Parameters

### container

`HTMLElement`

The docs-content box holding rendered payload HTML.

## Returns

`Promise`\<`void`\>
