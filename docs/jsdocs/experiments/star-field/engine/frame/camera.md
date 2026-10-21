# `experiments\star-field\engine\frame\camera.ts`

Camera-side per-frame behavior — world/screen anchor

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\frame\camera.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `anchorScreenPos`

Projects an anchor's world position into canvas-space pixels for the
hover tooltip + leader line — one getWorldPosition → project(camera)
→ NDC → px pass, all on the shared scratch vector (zero per-frame
allocation). Returns null when the anchor or camera isn't projectable
(test mocks, unbooted state) or the point sits behind the camera.
- `@param` anchor Any Object3D in the scene graph.
- `@param` s Engine state (camera + canvas for the projection + size).

### `worldScreenPos`

Projects a raw world point into canvas-space pixels — the projection
backing for the navigator-hover position hint. Unlike
`anchorScreenPos` (which bails when the body leaves the view frustum),
this always returns a usable position: behind-camera points are
mirrored through the screen centre so the clamp lands on the edge
facing the object, and any off-screen result is clamped inside
`SF_TIP.EDGE_PAD` — the hint therefore locates the body at any zoom
level. `edge` reports the clamp and `angle` the outward direction in
degrees (canvas coords, y-down) for the leader-line arrow.
- `@param` p World-space point (pinned-frame coords).
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

### `followSelected`

Orbit-follow — keeps the followed anchor pinned at the world origin by
counter-translating `s.world` (the floating origin). Rider-mounted
bodies translate ~16k units/s on the galactic ring; riding them by
translating the camera would push every coordinate to ~6.7M where
float32 quantization (±0.5 units) makes each mesh visibly jitter.
Shifting the world instead of the camera yields identical relative
motion — the user's orbit/zoom offset is preserved because neither
camera nor target moves — while rendered coordinates stay small.
Runs before `updateFly` each tick so the tween's `track()` resolves
inside the pinned frame (select→glide becomes a local move, not a
galactic transit). The controls target snaps to the pin only once no
fly tween owns it, so orbiting still circles the body while the
tween's own target lerp stays free to pan.
Registry ids carry no anchor — they are static shard points — and are
skipped. Runs every tick (not just post-fly) so the repin lands the
same frame a new follow is armed.
- `@param` s Engine state.
