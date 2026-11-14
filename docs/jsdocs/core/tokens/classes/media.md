# `core\tokens\classes\media.ts`

Media render/placeholder class tokens — grouped subset of

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\media.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MEDIA_CLASSES`

Frozen media class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `MEDIA_FIGURE_TALL`

Figure modifier for sources taller than INTERNAL_MOSAIC.TALL_ITEM_H
(full-page captures): the carousel letterbox rule flips back to a
top-anchored cover crop for them — a 6000px-tall file scale-downed
into a strip box is a sliver, not a preview.

### `MEDIA_FIGURE_TOGGLE`

Play/pause toggle chip for ambient (controls-less) videos.
