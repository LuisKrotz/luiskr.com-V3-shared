# `core/tokens/starfield/params.ts`

Star-field engine parameters — camera rig, fly-to tween

| | |
|---|---|
| **Source** | `src/core/tokens/starfield/params.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `HOME_X`

Home/overview pose — pulled back far enough to read the whole chart.

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

### `SF_COLORS`

Procedural material palette — hex colors for bodies with no real imagery.
Star tints follow spectral class (G yellow-white, B blue, M red);
nebula/galaxy hues are emissive accents on a dark sprite.

### `SUN_LIGHT`

White sunlight point-light at the scene origin.

### `GLOW_INNER`

Glow ramp stops — canvas gradient needs literal rgba strings.

### `SF_SCENE`

Skybox sphere + starfield scales.
