# `core\utils\canvas\widgets\burger-button\shaders.ts`

GLSL sources for BurgerButtonWebGL, extracted from

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\burger-button\shaders.ts`  |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `BURGER_DERIV_PRELUDE`

Extension prelude enabling pixel-space SDF AA (WebGL1 only).

### `BURGER_VS`

Shared fullscreen-quad vertex shader.

### `BURGER_FS_BODY`

Liquid menu-icon fragment shader body (prefix with the deriv prelude).

### `burgerFsSource`

Full FS source for the current GL capability set.
