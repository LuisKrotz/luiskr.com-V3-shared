[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/updates](../README.md) / trackHover

```ts
function trackHover(s): void
```

Defined in: experiments/star-field/engine/frame/updates.ts:300

Hover tracking — re-projects the hovered anchor each tick and reports
canvas-space pixels so the DOM tooltip + leader line track orbiting
bodies. The navigator-hover hint takes precedence over the raycast
hover (the pointer is on the drawer) and resolves its stored anchor
or shard record into a live world point, then an edge-clamped screen
point that locates the body at any zoom level.
Fires nothing when hover is idle (no per-frame DOM churn).

## Parameters

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state.

## Returns

`void`
