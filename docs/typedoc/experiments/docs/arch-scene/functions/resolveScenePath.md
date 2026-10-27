[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / resolveScenePath

```ts
function resolveScenePath(placed, path): number
```

Defined in: experiments/docs/arch-scene.ts:1111

Resolves an active docsPath to a placed node — the exact match, or
when the scene caps ('+N' aggregates, depth budget) folded the path
away, the nearest visible ancestor (longest string-prefix + deepest
match wins). Returns -1 for ''/unresolvable paths so the focus falls
back to the portal root. Shared by both arms.

## Parameters

### placed

readonly [`PlacedNode`](../interfaces/PlacedNode.md)[]

Flattened placed tree.

### path

`string`

Active docsPath.

## Returns

`number`

placed index of the node to light/focus, or -1.
