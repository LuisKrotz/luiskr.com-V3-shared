[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/frame/camera](../README.md) / worldScreenPos

```ts
function worldScreenPos(
  p,
  s
): {
  x: number
  y: number
  edge: boolean
  angle?: number
} | null
```

Defined in: experiments/star-field/engine/frame/camera.ts:66

Projects a raw world point into canvas-space pixels — the projection
backing for the navigator-hover position hint. Unlike
`anchorScreenPos` (which bails when the body leaves the view frustum),
this always returns a usable position: behind-camera points are
mirrored through the screen centre so the clamp lands on the edge
facing the object, and any off-screen result is clamped inside
`SF_TIP.EDGE_PAD` — the hint therefore locates the body at any zoom
level. `edge` reports the clamp and `angle` the outward direction in
degrees (canvas coords, y-down) for the leader-line arrow.

## Parameters

### p

\| \{
`x`: `number`;
`y`: `number`;
`z`: `number`;
\}
\| `null`

World-space point (pinned-frame coords).

### s

[`SFState`](../../../types/interfaces/SFState.md)

Engine state (camera + canvas for the projection + size).

## Returns

\| \{
`x`: `number`;
`y`: `number`;
`edge`: `boolean`;
`angle?`: `number`;
\}
\| `null`
