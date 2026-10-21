[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / placeRoots

```ts
function placeRoots(roots): PlacedNode[]
```

Defined in: experiments/docs/arch-scene.ts:254

The manifest buckets hang off a synthetic center node — the portal
root level IS the tree root, so the scene reads as one rooted graph
(center = "In-depth project docs", ring 1 = the four buckets, …).
Buckets are { root, label, children } — mapped to dir nodes here so
they carry a real path (pickable + highlightable) and a real label.
Shared by the three.js and scene3d arms.

## Parameters

### roots

`object`[]

Manifest root buckets.

## Returns

[`PlacedNode`](../interfaces/PlacedNode.md)[]

The flattened placed tree.
