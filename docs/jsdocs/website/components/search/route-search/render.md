# `website\components\search\route-search\render.tsx`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\search\route-search\render.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `renderShell`

`renderShell` — the one-time skeleton: field pill + input combobox,
an empty results listbox, and the no-match row. Per-render state
(placeholder/labels) is applied imperatively by the facade so the
input never loses focus.

- `@param` strings Localized copy node.
- `@returns` The shell root element.

### `rowArrow`

The row's trailing arrow — affordance only; the ring-fill lives on the field.

### `renderItems`

`renderItems` — one `<li role=option>` per hit: numbered index pill,
title + preview + path body, circular ring-fill go button. The anchor
wraps the row so plain clicks navigate natively and modified clicks
keep new-tab semantics. Kind-ordered entries get a `role=group`
header row at each kind boundary — the first row of a page always
emits one so a mid-group page still names its bucket.

- `@param` entries Ranked entries to render (one results page).
- `@param` active Index of the keyboard/hover-active row (-1 none).
- `@param` strings Resolved copy node — supplies the group labels.
- `@param` offset Global rank of the page's first row (index pill base).
- `@returns` Array of li elements for the listbox.
