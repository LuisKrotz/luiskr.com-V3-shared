# `core\utils\canvas\widgets\flag\shaders.ts`

GLSL sources for the FlagWebGL flag renderer —

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\flag\shaders.ts`           |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `FLAG_VS`

Fullscreen-quad vertex shader: a_pos in clip space, v_uv 0–1 with y
inverted so top-left matches standard image coords.

### `FLAG_FS`

Flag fragment shader: texture warp, shading, split-screen dissolve.
