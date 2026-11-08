# `core\tokens\classes\related.ts`

Related-projects accordion-list class tokens — grouped

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\related.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `RELATED_CLASSES`

Frozen related class-name map — sole declaration site for these tokens; consumers read
members and never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes
the token contract immutable at runtime.

### `RELATED_LIST_ITEM_CLOSED`

Collapsed window slot — the item outside the 3-card viewport folds
to zero height (grid-template-rows 0fr) until the conveyor expands
it back in.

### `RELATED_LIST_INNER`

Clip wrapper inside the item's animated grid row — min-height:0 +
overflow:hidden is what lets the 0fr track collapse smoothly.

### `RELATED_LIST_IMG_PLACEHOLDER`

Progressive-cover layers — intrinsic-size SVG reserves the painted
box, LQIP first paint, then the display ladder fades in over it.

### `RELATED_LIST_IMG_LOADED`

Published on the high layer's `load` — the CSS crossfade trigger.

### `RELATED_LIST_RING_CANVAS`

WebGPU overlay canvas for the instanced border-sheen rings.

### `RELATED_LIST_CONTROLS`

Prev/next control row rendered under the conveyor.

### `RELATED_LIST_BTN`

One conveyor step button (base + --prev/--next modifiers).
