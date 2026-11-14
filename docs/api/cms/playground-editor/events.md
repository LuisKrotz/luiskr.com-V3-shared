# `cms\playground-editor\events.ts`

Event wiring for &lt;cms-playground-editor&gt;: the save button,

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\playground-editor\events.ts`           |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `bindEvents`

Wires the playground editor — save/locale/add-key single bindings, then
three delegated row groups: `.ep-value` label inputs and `.ep-del`
buttons (keyed by `data-field`), `.slug-value` route-slug inputs, and
the typed defaults (`.ep-def-num` numeric coerced, `.ep-def-bool`
checkboxes). Host methods stay the call path so test spies intercept.

- `@param` ed — the CmsPlaygroundEditor exposing `addScopedListener` + `$`/`$$`

### `on`

Single-element scoped listener, no-op when the selector misses.
