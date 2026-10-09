# `experiments/star-field/starfield-engine.ts`

Facade for the star-field three.js engine — owns the SFState

| | |
|---|---|
| **Source** | `src/experiments/star-field/starfield-engine.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `StarFieldEngine`

Owns the full star-field scene: renderer, camera rig, skybox, catalog
body graph, raycast picking, fly-to tweens and the RAF loop. The host
component reads `failed` to swap in the CSS fallback surface.

### `#s`

All mutable engine state — see engine/state.ts.

### `init`

Async bootstrap — catches throws, marks failed when the scene never
assembled (silent bailouts included), and always fires onReady so the
loader can never stick. Same contract as EarthBackground.init().

### `failed`

True when bootstrap bailed or threw before the scene assembled.

### `setReducedMotion`

Pause/resume the render loop for prefers-reduced-motion — the last
frame stays on screen (preserveDrawingBuffer), so pausing never
blanks the scene.

### `selectBody`

Flies the camera to a catalog body. Called by the host for both nav
picks and canvas raycast picks — `onSelect` is only fired by the
pointer path (picking.ts) so selection never loops.
- `@param` id Catalog body id.

### `flyHome`

Returns the camera to the overview pose — the whole-chart vantage.

### `takeScreenshot`

Downloads the current frame as a PNG.

### `destroy`

Tears down listeners, RAF, controls and the renderer.
