# `experiments/star-field/engine/picking.ts`

Pointer picking for the star-field canvas: pointerdown

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/picking.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `CLICK_DRAG_PX`

Max pointer travel (px) still counted as a click, not an orbit drag.

### `resolveHit`

Walks a hit object up its ancestor chain until a `userData.bodyId`
appears — raycast hits land on child detail (cloud shells, rings,
halos, satellite pivots) that carry no id, so the owning body is the
nearest tagged ancestor. Returns the id and whether the originally
hit object was an oversized invisible pick proxy.
- `@param` object The raycast hit object.
- `@returns` `{ id, proxy }` or null when no ancestor carries a body id.

### `chainVisible`

Walks a hit object's ancestor chain — three.js raycasts don't cull
`visible: false` objects, so a deep-tier body gated off by the LOD
tier reveal would still hover/pick through its hidden pivot.
- `@param` object The raycast hit object (may be a deep child).
- `@returns` false when any ancestor is hidden.

### `pickAt`

Raycasts pickables at a pointer position — converts client coords into
canvas-relative NDC, then intersects `s.pickables` recursively so shell
children resolve to their body's mesh via userData walk-up. Hits that
land on oversized invisible pick proxies lose to any real-mesh hit
further down the ray, so clicking through a fat proxy bubble still
selects the actual body underneath.
- `@returns` The hit body id, or null.

### `RaycasterCtor`

Set by bootstrap — the lazily imported Raycaster class.

### `armPicking`

Stores the Raycaster constructor — bootstrap calls this after the lazy
three import so picking.ts never imports three itself (tree-shakeable,
test-mockable).

### `bindPicking`

Binds the pointer listeners on the render canvas: down records origin +
cancels fly, up-within-threshold selects, move updates hover. Listeners
live in state so destroy() can detach them all.
- `@param` s Engine state.
