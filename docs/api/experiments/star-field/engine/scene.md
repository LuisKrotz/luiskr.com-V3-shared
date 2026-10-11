# `experiments/star-field/engine/scene.ts`

Scene-graph foundation for the star-field engine: the

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/scene.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `makeGlowTexture`

Creates the shared soft radial-gradient texture used by every glow
billboard (nebulae, galaxy cores, star halos). A 128px canvas with a
white-center → transparent-edge gradient; the material's `color`
channel tints it per body so one texture serves all hues. Returns
undefined when the 2d context is unavailable (headless probes) —
callers fall back to untextured materials.
- `@param` THREE The three.js module.
- `@returns` A CanvasTexture or undefined.

### `setupStarCamera`

Builds the camera + orbit-controls rig at the home/overview pose.
Damping is enabled so drag/momentum reads smooth; the controls target
doubles as the fly-to destination vector.
- `@param` s Engine state.
- `@param` THREE The three.js module.
- `@param` OrbitControls The controls class.

### `setupStarScene`

Wraps the scene in the milky-way skybox — a big inverted sphere whose
inside surface carries the 8k equirect star panorama — plus the light
rig: a dim ambient floor so night sides aren't pure black, and a point
light at the origin standing in for the Sun.
- `@param` s Engine state.
- `@param` THREE The three.js module.
- `@param` skyTex The loaded skybox texture (undefined → geometry skipped).
