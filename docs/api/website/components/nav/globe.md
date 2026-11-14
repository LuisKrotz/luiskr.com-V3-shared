# `website\components\nav\globe.tsx`

The language glyph for &lt;app-nav&gt;'s language chip — a silver

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\nav\globe.tsx`                  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `stop`

`stop` bound to a --nav-metal-* CSS prop — presentation attributes can't
resolve custom properties, so the value rides inline style.

### `ref`

`url(#id)` helper for gradient references.

### `NavGlobeIcon`

The <nav-globe-icon> element — silver globe with a speech bubble. The
stroke gradient runs teal to green so the sphere reads as a single lit
wire frame, the bubble sharing the same ramp.
