# `cms\about\events.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\about\events.ts`                       |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `bindEvents`

Binds the About editor's events — two binding helpers then one block per
UI region. `on` attaches a scoped listener to a single matching element;
`all` iterates every match (row-level controls rendered per item carry
`data-col`/`data-idx`/`data-field` attrs read here to route the write).
Scoped listeners auto-detach on re-render so re-binding after each
render is the intended lifecycle.

- `@param` host — the host component exposing `addScopedListener` + `$`/`$$`

### `on`

Single-element scoped listener, no-op when the selector misses.

### `all`

Runs `fn` on every match — used to wire each rendered row's controls.
