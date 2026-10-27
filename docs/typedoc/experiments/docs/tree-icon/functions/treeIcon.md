[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/tree-icon](../README.md) / treeIcon

```ts
function treeIcon(node, open): SVGElement
```

Defined in: experiments/docs/tree-icon.tsx:1419

The row icon for one manifest node — directories get the stateful
paper-stack folder, files the kind-keyed pack glyph.

## Parameters

### node

[`DocsNode`](../../manifest/interfaces/DocsNode.md)

The manifest node the row renders.

### open

`boolean`

Whether a directory row is expanded (file rows ignore it).

## Returns

`SVGElement`

The SVG subtree.
