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

### `accent`

Ring/glow accent — `--color-accent-contrast` (deep gunmetal on light discs, the silver signature on dark).

### `accentRgb`

Accent as a precomposed `r,g,b` channel string for rgba() alpha variants.

### `_palKey`

Cached palette keyed to the theme flag it was sampled under.

### `_pal`

The cached palette — invalidated whenever _palKey's theme flag changes.

### `arrowPalette`

Samples `--bg-primary`/`--text-primary`/`--color-accent-contrast` once per
theme so the disc, arrow and progress ring flip with the site palette —
light mode paints the deep-gunmetal accent (the bright silver signature is
unreadable on light glass), dark mode keeps the silver (the contrast token re-pins it).
Re-samples on a theme flip.

- `@returns` The resolved disc + glyph inks.

### (module scope)

Everything the 2D paint pass needs from the widget instance.

### `paintCarouselArrow2D`

paints carousel arrow2 d.
