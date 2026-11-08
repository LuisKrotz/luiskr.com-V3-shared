# `website\components\media\mosaic\render.tsx`

JSX for &lt;media-mosaic&gt;: the packed tile wall (one

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\mosaic\render.tsx`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `renderTile`

One wall tile — a positioned wrapper carrying the packed box plus a
<media-figure> at the item's intrinsic size (the figure's own sizing
contract clamps the painted box at --mf-natural-*; the tile is never
larger than the source). The sr-only h4 mirrors carousel slides: the
AT jump target that names this media, tabindex −1 so SR focus can land.

- `@param` host The MediaMosaic element.
- `@param` item The media descriptor.
- `@param` i Item index (matches host.tiles order).

### `renderMediaMosaic`

JSX template. Compact (≤640px) renders the carousel exactly as the
internals strip does today — the element is configured by the facade
after mount. Desktop renders the skyline-packed wall.

- `@param` host The MediaMosaic element.
