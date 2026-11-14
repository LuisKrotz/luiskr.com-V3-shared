# `cms\playground-editor\render.tsx`

JSX sections for &lt;cms-playground-editor&gt;: the playground

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\playground-editor\render.tsx`          |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `SLUG_KEYS`

Frozen slug list — the ordered source for this token set.

### `renderLabelRows`

Key/value rows for the earth-playground page labels — one editable
input + delete button per key; the empty state nudges the editor to
add keys or switch locale. `data-field` carries the key for the
delegated change/remove handlers in `events.ts`.

### `renderDefaults`

Control-defaults rows — the input type is chosen from the stored value
type (boolean → checkbox toggle, number → numeric input) so the
defaults object stays schema-free. These seed the playground's panel
controls until a visitor's own overrides take over.

### `renderSlugRows`

Per-locale route-slug rows — one input per `SLUG_KEYS` entry; empty
means "keep the code default". The router and language switcher read
these at `translations/<locale>/slugs`.

### `renderPlaygroundEditor`

Top-level template — header + save, locale picker, then three cards:
playground labels (`_renderLabelRows`), control defaults
(`_renderDefaults`), and localized route slugs (`_renderSlugRows`).

- `@param` ed — the CmsPlaygroundEditor hosting the data slices
