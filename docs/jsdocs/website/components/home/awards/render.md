# `website\components\home\awards\render.tsx`

JSX template for &lt;awards-mentions&gt; — the footer band with

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\awards\render.tsx`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `carouselHeading`

Names the mentions carousel — the localized ordinal ('Carousel 1') plus
the lead item's own text so the AT jump target is meaningful. The
ordinal alone is the fallback for unlabeled items.

- `@param` items The award entries feeding the carousel.
- `@returns` The sr-only heading text.

### `renderRights`

Copyright line with the © glyph and the year set in bold.

### `renderAwards`

Renders awards.

- `@param` el — the element
