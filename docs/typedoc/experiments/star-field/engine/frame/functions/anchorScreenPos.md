[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/frame](../README.md) / anchorScreenPos

```ts
function anchorScreenPos(anchor, s): 
  | {
  x: number;
  y: number;
}
  | null;
```

Defined in: experiments/star-field/engine/frame.ts:61

Projects an anchor's world position into canvas-space pixels for the
hover tooltip + leader line — one getWorldPosition → project(camera)
→ NDC → px pass, all on the shared scratch vector (zero per-frame
allocation). Returns null when the anchor or camera isn't projectable
(test mocks, unbooted state) or the point sits behind the camera.

## Parameters

### anchor

Any Object3D in the scene graph.

#### getWorldPosition?

(`v`) => `object`

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state (camera + canvas for the projection + size).

## Returns

  \| \{
  `x`: `number`;
  `y`: `number`;
\}
  \| `null`
