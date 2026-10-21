[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / graphFit

```ts
function graphFit(placed): GraphFit
```

Defined in: experiments/docs/arch-scene.ts:288

Fit the camera to the real graph radius — a deep manifest (outer
rings past ~60 units) left the default pose sitting INSIDE the tree,
which rendered nodes as giant blobs instead of a legible radial
map. dist = r/sin(fov/2) with ~20% margin frames the whole graph.

## Parameters

### placed

readonly [`PlacedNode`](../interfaces/PlacedNode.md)[]

The flattened placed tree.

## Returns

[`GraphFit`](../interfaces/GraphFit.md)
