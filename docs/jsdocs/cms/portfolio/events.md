# `cms\portfolio\events.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\portfolio\events.ts`                   |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `bindEvents`

Binds the portfolio list's events — header buttons (add/sync/save), the
language selector, then three delegated row-level groups: `data-action`
buttons (up/down/delete), `.item-field` inputs (label/link/image/
description write-back), `.dim-field` inputs (width/height ×
desktop/mobile slots via `data-prop`/`data-dim-idx`), and the featured
select. Scoped listeners detach on re-render; binding per render is
the intended lifecycle.

- `@param` host — the host component exposing `addScopedListener` + `$`/`$$`
