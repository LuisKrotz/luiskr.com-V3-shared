# `core\utils\canvas\css-color.ts`

Shared CSS-color parser for the canvas widgets — converts

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\css-color.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `HEX_RE`

#rgb / #rrggbb hex matcher — 3- or 6-digit forms only.

### `RGB_RE`

rgb()/rgba() matcher — captures the three integer channel values.

### `SRGB_RE`

color(srgb r g b) matcher — captures the three 0–1 channel floats.

### `parseCssColor`

Parses a CSS color string into a [r, g, b] 0–1 triple, or null.
