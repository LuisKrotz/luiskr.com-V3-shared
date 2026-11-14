# `cms\portfolio\render.tsx`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\portfolio\render.tsx`                  |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `renderItem`

Renders one portfolio item card — identity row (thumbnail + numbered
title + reorder/delete controls), then the field groups: localized
label/description, non-localized slug/image/featured, and the 4-cell
desktop/mobile width×height dimension grid. `data-idx`/`data-field`/
`data-prop`/`data-dim-idx` drive the delegated write-backs in
`events.ts`; dimension arrays are `[desktop, mobile]` pairs.

- `@param` host — the host component (for image preview + items length)
- `@param` item — the portfolio item model slice
- `@param` idx — zero-based position in the list (controls + data attrs)

### `renderPortfolioList`

Renders the full portfolio manager — header (add / sync-to-all-languages /
save), language picker, then either the item card list (`renderItem`
per entry) or an empty-state card prompting creation.

- `@param` host — the CmsPortfolioList hosting the items slice
