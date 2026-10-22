# `website\views\project\render.tsx`

JSX for ViewProject — title, cover figure, and the section list (text columns + media carousels) with per-section item heights.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\project\render.tsx`                  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `carouselLeadText`

Lead text naming one media carousel — the first item's label; '' lets
the caller render the ordinal template alone.

- `@param` items the carousel's media rows

### `sectionLeadText`

Lead text naming one project section — the first paragraph of its first
text block when present, else the first media label; '' lets the caller
fall back to the generic ordinal heading.

- `@param` section one row of mixed text/media children

### `renderProject`

Renders project.

- `@param` c — the component
