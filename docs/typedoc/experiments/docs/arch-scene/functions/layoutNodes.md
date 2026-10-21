[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / layoutNodes

```ts
function layoutNodes(nodes, depth?, from?, to?, parent?, acc?): PlacedNode[]
```

Defined in: experiments/docs/arch-scene.ts:69

Flattens the manifest tree into positioned node descriptors: depth sets
the ring radius, sibling order spreads the angle. Recursive per the
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
