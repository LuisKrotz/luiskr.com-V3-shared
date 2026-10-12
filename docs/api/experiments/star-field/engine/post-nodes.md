# `experiments/star-field/engine/post-nodes.ts`

Custom TSL post nodes for the star-field RenderPipeline

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/post-nodes.ts`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Arguments for the star-field vignette node.

### (module scope)

Fn argument-object constraint — nodes are opaque to the index.

### `color`

Incoming scene color (rgba).

### `uv`

Screen-space uv (0..1).

### `darkness`

Curve exponent + lerp weight combined (photographic feel).

### `offset`

Radial reach — higher pulls the falloff toward center.

### `makeSFVignetteNode`

Builds the vignette node used at the end of the post chain.

Math:
d = |uv − 0.5|·2 → 0 at center, ~1.41 at corners.
v = 1 − |d|·offset, clamped → linear falloff scaled by reach.
factor = mix(1, v^darkness, min(darkness,1)) → darkness doubles as
curve exponent and amount so a single value feels photographic.

- `@param` TSL The three/tsl namespace (lazy-loaded in bootstrap).
- `@returns` The vignette Fn ready to wrap a color node.
