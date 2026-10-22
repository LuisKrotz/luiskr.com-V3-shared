# `experiments\earth-playground\space\panel-render.tsx`

Pure JSX renderers for the space-playground control panel,

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/experiments\earth-playground\space\panel-render.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.   |

## Members

### `controlDesc`

Builds the aria-describedby id + technical description for one control.
The description names the engine param the row drives (and the slider
bounds for ranges) so AT announces what the control actually changes.

- `@param` ctrl The control schema row.
- `@param` labelText The resolved localized label.
- `@returns` `{ id, text }` — id for aria-describedby, text for the hidden span.

### `renderSpControl`

One control row. Checkboxes render a WebGL check canvas + SVG check icon;
ranges render a slider with the range-fill CSS var + a value readout.
`savedVal` (persisted user value) wins over the control's shipped default.
Each row is preceded by a sr-only h4 — every control is a heading so AT
heading-jump can list and reach every option; the input carries an
aria-describedby technical line (param id + bounds).

### `renderSpAction`

One group-level action button (reset view / screenshot / copy settings).
Preceded by a sr-only h4 — every action is a heading so AT heading-jump
lists it like the controls; the button carries a describedby technical
line naming the dispatched action token.
