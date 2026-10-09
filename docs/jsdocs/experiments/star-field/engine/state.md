# `experiments/star-field/engine/state.ts`

Factory for the star-field engine state bag — one mutable

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/state.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Lifecycle callbacks the host component wires in at construction.

### `createStarState`

Builds the initial engine state — everything null/empty until bootstrap
fills it; `disposed`/`failed`/`reduced` are the flags every async stage
re-checks before touching the scene.
- `@param` canvas Persistent canvas the host renders into.
- `@param` events Host callbacks (ready/progress/select/approach/hover).
- `@returns` Fresh SFState.
