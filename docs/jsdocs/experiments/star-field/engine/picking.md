# `experiments/star-field/engine/picking.ts`

Pointer picking for the star-field canvas: pointerdown

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/picking.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `CLICK_DRAG_PX`

Max pointer travel (px) still counted as a click, not an orbit drag.

### `pickAt`

Raycasts pickables at a pointer position — converts client coords into
canvas-relative NDC, then intersects `s.pickables` recursively so shell
children resolve to their body's mesh via userData walk-up.
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
