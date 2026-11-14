# `core\utils\canvas\widgets\theme-slider\shaders.ts`

GLSL sources for ThemeSliderWebGL's day/night scene,

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\theme-slider\shaders.ts`   |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `THEME_SLIDER_VS`

Fullscreen-quad vertex shader: a_pos in clip space, v_uv 0–1.

### `THEME_SLIDER_FS`

Day/night scene fragment shader (sun, moon, aurora, knob). The star
hash keeps its own 12.9898/78.233 seed — switching to the shared
127.1/311.7 seed would re-roll every star position.
