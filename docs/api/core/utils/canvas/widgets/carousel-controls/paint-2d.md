# `core\utils\canvas\widgets\carousel-controls\paint-2d.ts`

Canvas2D renderer for CarouselArrowWebGL, extracted from

|                |                                                               |
| -------------- | ------------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\widgets\carousel-controls\paint-2d.ts` |
| **UX surface** | Shared primitives every surface builds on — no direct UI.     |

## Members

### (module scope)

Theme inks the painter needs — resolved CSS values, safe as canvas colors.

### `disc`

Disc glass — `--bg-primary` (white in light mode, black in dark).

### `ink`

Arrow glyph ink — `--text-primary` (dark on light disc, white on dark).

### `_palKey`

Cached palette keyed to the theme flag it was sampled under.

### `arrowPalette`

Samples `--bg-primary`/`--text-primary` once per theme so the disc + arrow
flip with the site palette (light mode paints the light-glass/dark-ink
variant instead of the always-dark obsidian). Re-samples on a theme flip.

- `@returns` The resolved disc + glyph inks.

### (module scope)

Everything the 2D paint pass needs from the widget instance.

### `paintCarouselArrow2D`

paints carousel arrow2 d.
