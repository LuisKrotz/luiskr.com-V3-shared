# `experiments/star-field/engine/fallback-stars.ts`

Static 2D-canvas starfield for the no-WebGL fallback —

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/fallback-stars.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `paintStarFallback`

One-shot paint of the seeded starfield into the fallback canvas.

### `bindStarFallback`

Binds the fallback canvas: paints immediately and repaints whenever the
element resizes (viewport changes, grid step flips). Returns a disposer
for teardown — null when the canvas/observer can't run.
- `@param` canvas The `.sf-fallback` canvas element.
