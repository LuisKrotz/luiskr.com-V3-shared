# `experiments\star-field\engine\post.ts`

Post-processing chain for the star-field engine —

| | |
|---|---|
| **Source** | `src/experiments\star-field\engine\post.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Post-chain dependencies — lazy-imported in bootstrap so the TSL graph
and the display nodes only load when the WebGL engine actually boots.

### `TSL`

three/tsl namespace.

### `RenderPipeline`

RenderPipeline class from three/webgpu.

### `bloom`

Unreal-style bloom node.

### `film`

Film grain node.

### `buildStarPostPipeline`

Assembles the RenderPipeline post chain (screen-space, in order):
  scene → +bloom → vignette → film grain
Bloom sits first so the vignette shapes the halos too, and grain lands
last so it dithers the final frame. On any failure the pipeline is
torn down and `s.pipeline` stays null — the frame loop then renders
the scene directly with no post.
- `@param` s Engine state (renderer/scene/camera must be live).
- `@param` deps Lazy-loaded TSL/post dependencies.
