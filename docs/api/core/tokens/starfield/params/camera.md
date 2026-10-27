# `core\tokens\starfield\params\camera.ts`

Camera-rig and navigation parameters — field of view,

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\starfield\params\camera.ts`              |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `NEAR`

Near plane — the solar tier is drawn at honest stellar-neighbourhood
scale (planets are ~0.001-unit specks), so the near plane must sit
under the closest lawful approach (SF_ZOOM.MIN 0.02). The FAR/NEAR
ratio of 2e7 is far beyond linear 24-bit depth precision, so the
renderer runs a logarithmic depth buffer — see renderer-setup.

### `FAR`

Far plane — reaches the cosmic tier and observable-universe boundary
shell with logarithmic depth buffer precision.

### `HOME_X`

Home/overview pose — frames the solar system tier out to Kuiper belt.

### `SF_MOTION`

Fly-to tween + idle drift timing (ms / scene-units per second).

### `FLY_MS`

Camera flight duration on body select — long enough to read as a glide.

### `DAMPING`

Controls damping factor per frame (OrbitControls.enableDamping).

### `ORBIT_SPEED`

Base orbit angular speed (rad/s) multiplied by each body's speed field.

### `SPIN_SPEED`

Base self-rotation speed (rad/s) multiplied by each body's spin field.

### `SF_APPROACH`

Lazy-dossier trigger distance — the JSON for a body prefetches when the
camera comes within `approachPad + body.radius * approachScale` units,
so big bodies arm their data earlier than small ones.

### `SF_ZOOM`

Orbit-controls zoom bounds — clamps how far the camera can dolly:
MIN keeps a close approach above the body surface; MAX frames the
whole cosmic hierarchy — Milky Way, the Local Group neighbourhood and
the supercluster/observable-universe shells.

### `MIN`

Closest lawful camera–target distance above body surface.

### `STANDOFF`

Fly-to standoff multiplier — the camera glides to STANDOFF × the
body's radius along its current view direction.

### `STANDOFF_MIN`

Fly-to standoff floor.

### `SF_TIP`

Hover/hint tooltip projection — the navigator's position hint clamps
the picked body's projected marker inside the canvas edge when the
object sits off-screen or behind the camera, so hovering a catalog row
locates it at any zoom level. EDGE_PAD is the canvas-space inset (px)
that keeps the marker dot and its label readable on the frame edge.

### `SF_KEYS`

Arrow-key view rotation — radians per keypress applied around the
controls target; POLAR clamps keep the camera off the poles.
