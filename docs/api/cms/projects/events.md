# `cms\projects\events.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\projects\events.ts`                    |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `bindEvents`

Binds the projects editor's events — header buttons, the lang/project
selectors, then (only when a project is loaded) the scalar fields, and
finally the per-row controls on each section card. Row controls carry
`data-idx` (section index), `data-sec` + `data-tidx`/`data-midx` attrs
read here to route the write into `proj.sections[s][0|1][i]` — the
`[texts, media]` tuple shape `sections.ts` normalizes. Scoped
listeners auto-detach on re-render so re-binding per render is intended.

- `@param` host — the host component exposing `addScopedListener` + `$`/`$$`

### `on`

Single-element scoped listener, no-op when the selector misses.

### `all`

Runs `fn` on every match — used to wire each rendered row's controls.
