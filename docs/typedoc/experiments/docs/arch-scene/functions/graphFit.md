[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / graphFit

```ts
function graphFit(placed): GraphFit
```

Defined in: experiments/docs/arch-scene.ts:1155

Fit the camera to the real graph radius — the sphere layout spreads
clusters along parent orbits, so the bound is the longest orbit
chain: distance(node) = orbit(parent→node) + distance(parent),
accumulated down each branch. dist = r/sin(fov/2) with ~20% margin
frames the whole graph.

## Parameters

### placed

readonly [`PlacedNode`](../interfaces/PlacedNode.md)[]

The flattened placed tree.

## Returns

[`GraphFit`](../interfaces/GraphFit.md)
