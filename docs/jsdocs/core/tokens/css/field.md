# `core\tokens\css\field.ts`

Backdrop-field palette CSS custom-property names — the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\css\field.ts`                            |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `INK`

Newsprint ink pole — sampled by the shader's counter-shade lobe
(NOT a u_col slot: it mixes the field darker, not into a hue lobe).

### `SPECULAR`

Specular white — the key light's tint; pure white in both themes
(studio specular reads neutral over paper and metal alike).

### `FIELD_CSS_PROP_LIST`

Shader colour-slot order — index `i` of this list is `u_col[i]` in the
page-backdrop fragment shader, so the GLSL lobe table and the JS
sampler can never disagree on which material a slot holds.
