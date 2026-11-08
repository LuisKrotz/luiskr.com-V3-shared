# `core\tokens\classes\media-mosaic.ts`

Internals media-mosaic wall class tokens — token group.

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\media-mosaic.ts`                 |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MEDIA_MOSAIC_CLASSES`

Frozen media-mosaic class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `MEDIA_MOSAIC`

The absolutely-packed masonry wall container inside <media-mosaic>.

### `MEDIA_MOSAIC_ITEM`

One positioned tile on the wall (top/left/width/height set inline).

### `MEDIA_MOSAIC_ITEM_FIGURE`

Class forwarded onto each tile's <media-figure> host — lets the
figure shadow root resolve the mosaic sizing context via
:host-context / :host([classes*=…]).
