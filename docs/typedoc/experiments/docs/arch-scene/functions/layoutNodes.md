[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / layoutNodes

```ts
function layoutNodes(nodes, depth?, from?, to?, parent?, acc?): PlacedNode[]
```

Defined in: experiments/docs/arch-scene.ts:241

Flattens the manifest tree into positioned node descriptors: depth sets
the ring radius, sibling order spreads the angle. Sectors split
proportionally to subtree weight (balloon-tree), not sibling count —
a 300-file branch gets the angular room its leaf count needs while a
single-file branch takes a thin slice; equal splits are what packed
dense subtrees into unreadable blobs. Recursive per the
self-similar-traversal rule.

## Parameters

### nodes

[`DocsNode`](../../manifest/interfaces/DocsNode.md)[]

### depth?

`number` = `0`

### from?

`number` = `0`

### to?

`number` = `...`

### parent?

`number` = `-1`

### acc?

[`PlacedNode`](../interfaces/PlacedNode.md)[] = `[]`

## Returns

[`PlacedNode`](../interfaces/PlacedNode.md)[]
