# `experiments\star-field\starfield-engine.ts`

Facade for the star-field three.js engine — owns the SFState

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\starfield-engine.ts`        |
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

Flies the camera to a body — catalog slugs resolve through the
anchors map; registry ids (`star-NNNNNN`…) resolve through the
shard index to their true heliocentric position. Called by the host
for both nav picks and canvas raycast picks — `onSelect` is only
fired by the pointer path (picking.ts) so selection never loops.

- `@param` id Catalog body id or registry id.

### `setHint`

Navigator-hover position hint — arms the hint record for the row
under the pointer/focus so `trackHover` reports the body's
projected (edge-clamped) screen position every tick: the hint
locates the object at any zoom level, on- or off-screen. Catalog
ids store their anchor (live world position); registry rows store
their shard record so the static shard point resolves in the
pinned frame. Also echoes `onHover` so the tooltip label +
aria-live announce populate the same way canvas hover does.
Pass null to clear.

- `@param` id Hovered body id, or null to clear the hint.
- `@param` rec Registry record when `id` is a shard id (star-NNNNNN…).

### `rotateView`

Arrow-key orbit — rotates the camera around the controls target in
screen-intuitive steps: left/right change azimuth, up/down change
polar (clamped off the poles). Pure spherical math on the offset
vector — no three types needed, and any running fly-to is cancelled
so manual control wins.

- `@param` dAzimuth Azimuth delta in radians (left = -, right = +).
- `@param` dPolar Polar delta in radians (down = -, up = +).

### `deselect`

Releases the selection without moving the camera — stops the
per-frame orbit-follow when the dossier panel closes, so the chart
is no longer glued to the body the user dismissed.

### `flyHome`

Overview — glides to the solar-system vantage: the camera tracks the
Sun anchor's live position (it rides the rotating galactic disc, so a
fixed target would strand the view on empty space) at the HOME
standoff, which frames the tier out to the Kuiper belt. Falls back
to the scene origin only while anchors are unavailable.

### `takeScreenshot`

Downloads the current frame as a PNG.

### `destroy`

Tears down listeners, RAF, controls and the renderer.
