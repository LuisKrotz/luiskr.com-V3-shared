# `core\tokens\classes\route-search.ts`

Route-search (404 autocomplete) class tokens — grouped subset

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\classes\route-search.ts`                 |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `ROUTE_SEARCH_CLASSES`

Frozen route-search class-name map — sole declaration site for these
tokens; consumers read members and never re-declare the strings
(zero-hardcoding rules 4–5). Object.freeze makes the token contract
immutable at runtime.

### `ROUTE_SEARCH`

Block root — also the custom-element tag name.

### `ROUTE_SEARCH_FIELD`

Pill wrapper around the input — carries the glow border.

### `ROUTE_SEARCH_INPUT`

The search input itself.

### `ROUTE_SEARCH_LABEL`

Visible label heading above the field.

### `ROUTE_SEARCH_HEAD`

Header row holding the label (left) and the result status (right).

### `ROUTE_SEARCH_FOUND`

Status line opposite the label — "N results found" / search dots.

### `ROUTE_SEARCH_FOUND_TEXT`

The status' text node (count copy) — swapped for dots while busy.

### `ROUTE_SEARCH_FOUND_DOTS`

Three-dot searching indicator inside the status.

### `ROUTE_SEARCH_SUBMIT`

Circular submit button glued inside the field's right edge.

### `ROUTE_SEARCH_SUBMIT_ICON`

Arrow SVG inside the submit button.

### `ROUTE_SEARCH_FIELD_RING`

Conic-gradient ring fallback on the field (the WASM fill target).

### `ROUTE_SEARCH_COMBO`

Anchor wrapping the field + panel — the floated panel's containing
block (layout-transparent `display: contents` by default).

### `ROUTE_SEARCH_PANEL`

Dropdown panel wrapping the listbox + no-match row — in flow by
default; hosts can float it under the field via --rs-panel-position.

### `ROUTE_SEARCH_LIST`

Results list (role=listbox).

### `ROUTE_SEARCH_ITEM`

A single result row (role=option).

### `ROUTE_SEARCH_ITEM_ACTIVE`

BEM modifier — the keyboard/hover-active row.

### `ROUTE_SEARCH_LINK`

The row-spanning anchor inside each item.

### `ROUTE_SEARCH_INDEX`

Numbered circle at the row's leading edge (image-2 style).

### `ROUTE_SEARCH_BODY`

Text column (title + preview + path).

### `ROUTE_SEARCH_TITLE`

Route title line.

### `ROUTE_SEARCH_PREVIEW`

One-line "what's inside" preview.

### `ROUTE_SEARCH_PATH`

URL path line under the title.

### `ROUTE_SEARCH_ARROW`

Trailing arrow span inside each result row.

### `ROUTE_SEARCH_ARROW_ICON`

The SVG element inside the row arrow.

### `ROUTE_SEARCH_THUMB`

Project cover thumbnail inside a result row.

### `ROUTE_SEARCH_GROUP`

In-list group header row separating the kind-ordered hit buckets.

### `ROUTE_SEARCH_GROUP_LABEL`

Text label inside the group header row.

### `ROUTE_SEARCH_PAGER`

Result pager — prev/status/next row under the listbox.

### `ROUTE_SEARCH_PAGER_PREV`

Previous-page pager button.

### `ROUTE_SEARCH_PAGER_STATUS`

"Page x / y" status text inside the pager.

### `ROUTE_SEARCH_PAGER_NEXT`

Next-page pager button.

### `ROUTE_SEARCH_EMPTY`

No-results row.

### `ROUTE_SEARCH_HINT`

Keyboard hint line under the field.

### `ROUTE_SEARCH_CANVAS`

Overlay canvas for the WebGPU ring-fill widget.

### `ROUTE_SEARCH_OPEN`

BEM modifier on the root while the listbox is open.

### `ROUTE_SEARCH_LOADING`

BEM modifier on the root while a scoring dispatch is in flight —
the submit glyph spins so the wait reads as progress, not dead UI.

### `ROUTE_SEARCH_HERO`

BEM host marker — the standalone /search view mounts the surface
as its page hero: the label takes the .ttl-xxl ramp.

### `SEARCH_VIEW`

<view-search> page root — the column that centers the surface.
