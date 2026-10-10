# `experiments/star-field/engine/frame.ts`

Per-frame + per-resize behavior for the star-field engine:

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/frame.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Vec3`

Lazily-armed Vector3 ctor — set by bootstrap after the three import.

### `_scratch`

Scratch vector reused by every proximity measurement (no per-frame alloc).

### `_iceColor`

Glaciation-cycle tint colors — armed once by bootstrap (zero alloc).

### `armFrame`

Stores the real Vector3 (+ optional Color) constructors — bootstrap
calls this after the lazy three import so frame.ts never imports three
itself. The Color pair pre-builds the glaciation tint ramp so the
per-frame cycle lerps without allocating.
- `@param` V The three.js Vector3 class.
- `@param` C The three.js Color class (optional — tests may omit it).

### `anchorScreenPos`

Projects an anchor's world position into canvas-space pixels for the
hover tooltip + leader line — one getWorldPosition → project(camera)
→ NDC → px pass, all on the shared scratch vector (zero per-frame
allocation). Returns null when the anchor or camera isn't projectable
(test mocks, unbooted state) or the point sits behind the camera.
- `@param` anchor Any Object3D in the scene graph.
- `@param` s Engine state (camera + canvas for the projection + size).

### `anchorWorldPos`

World position of an anchor — single getWorldPosition call-site so the
armed Vector3 stays private to this module; returns {x,y,z} so callers
never handle three types.
- `@param` anchor Any Object3D in the scene graph.

### `rotateStarCamera`

Arrow-key orbit — rotates the camera around the controls target in
screen-intuitive steps: left/right change azimuth, up/down change
polar (clamped off the poles so the view can never flip over the top).
Pure spherical math on the offset vector — no three types needed —
and any running fly-to is cancelled so manual control always wins.
The offset is converted to spherical coordinates (r, θ azimuth in the
XZ plane, φ polar from +Y), the deltas are applied, then converted
back to Cartesian around the target.
- `@param` s Engine state (camera + controls required; no-op before boot).
- `@param` dAzimuth Azimuth delta in radians (left = -, right = +).
- `@param` dPolar Polar delta in radians (down = -, up = +).

### `handleStarResize`

Resize step: measures the shadow host first, then the canvas parent,
then the window. Pixel ratio caps at 2 to prevent 3x-phone fill-rate
blowout.
- `@param` s Engine state.

### `checkApproach`

Proximity check — when the camera comes within a body's approach
distance its dossier JSON prefetches via `onApproach`, once per body
per session (the `approached` set). Selection prefetches too, so a
slow drift-through and a direct nav click share one cache.
- `@param` s Engine state.

### `updateLod`

Detail level-of-detail — toggles each node's secondary geometry
(shells, satellite pivots, orbit guides) by camera distance so remote
bodies draw as one primitive. Orbit radius counts toward `size` so a
body's ring stays visible while the camera is still inside it.
- `@param` s Engine state.

### `updateRings`

Orbit-guide edge fade — each ring's opacity follows the view angle so
a guide seen edge-on dissolves instead of cutting a hard straight
line through its body. The math is zero-alloc: `matrixWorld` is
column-major, so elements [8..10] are the ring's world-space local +Z
(the plane normal, since the mesh is rotated flat) and [12..14] the
world translation. `edge` = |normal · dirToCamera| — 1 face-on, 0
edge-on; ORBIT_EDGE_GAIN keeps rings near-full until steep tilt.
- `@param` s Engine state.

### `updateFx`

Ambient life — the small "alive" behaviors on top of the static chart:
`pulse` bodies (variable stars, pulsars, flaring cores) breathe via a
sine scale oscillation; `cycle` bodies (Earth's glaciation) lerp the
surface tint between the neutral white and the ice-age palette.
- `@param` s Engine state.

### `trackHover`

Hover tracking — re-projects the hovered anchor each tick and reports
canvas-space pixels so the DOM tooltip + leader line track orbiting
bodies. Fires nothing when hover is idle (no per-frame DOM churn).
- `@param` s Engine state.

### `tickStar`

Per-frame update, self-rescheduling via RAF:
  orbits — pivot.rotation.y = phase + t·ORBIT_SPEED·speed
  spins  — spinner.rotation.y advances by SPIN_SPEED·spin·dt
  satellites — same orbit formula on child pivots
  fly    — eased camera tween overrides manual control until done
  render — plain renderer.render (no post pipeline in this engine)
- `@param` s Engine state.
- `@param` now RAF timestamp in ms — falls back to performance.now.
