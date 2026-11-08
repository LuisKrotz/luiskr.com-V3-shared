# `website\components\nav\grid.tsx`

The menu glyph for &lt;app-nav&gt;'s menu button — four neon

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\nav\grid.tsx`                   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `stop`

`stop` bound to a --nav-neon-* CSS prop — presentation attributes can't
resolve custom properties, so the value rides inline style.

### `ref`

`url(#id)` helper for gradient references.

### `NavGridIcon`

The <nav-grid-icon> element — four rounded neon squares. The stroke
gradient runs teal at the top-left to violet at the bottom-right so the
grid reads as one lit outline.
