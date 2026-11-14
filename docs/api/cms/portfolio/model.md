# `cms\portfolio\model.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\portfolio\model.ts`                    |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `getImagePreview`

Resolves a portfolio item's `image` field to a previewable URL —
absolute URLs pass through (already-hosted assets), bare filenames
compose against the CDN covers prefix + `.jpg` and run through
`encodeMediaUrl` for the media worker's token format.

- `@param` imgName — stored filename or absolute URL, may be undefined
- `@returns` preview URL, or empty string when nothing is set

### `updateDim`

Writes one dimension cell into an item's `[desktop, mobile]` pair —
legacy items missing the array get it created with the sibling slot
defaulted to the matching token (mobile width or desktop width).

- `@param` item — the portfolio item to mutate
- `@param` prop — `'width'` or `'height'`
- `@param` idx — 0 = desktop slot, 1 = mobile slot
- `@param` val — the input's raw string value

### `addNewItem`

Appends a placeholder portfolio item with sensible defaults —
`featured: false`, the token default dimension pairs, and a
`default-cover` image the editor can replace in place.

- `@param` host — the host component holding `items`

### `removeItem`

Deletes the item at `idx` after a label-named confirm — the splice
rewrites indices, so the render+rebind pair refreshes every row's
`data-idx` bindings.

- `@param` host — the host component holding `items`
- `@param` idx — zero-based list index

### `moveUp`

Moves an item one slot earlier — splice-remove + splice-insert keeps
identity so the re-render lands on the same object in a new position.

- `@param` host — the host component holding `items`
- `@param` idx — current index; 0 returns early (already first)

### `moveDown`

Moves an item one slot later — splice-remove + splice-insert at
`idx + 1`; last-position index returns early.

- `@param` host — the host component holding `items`
- `@param` idx — current index
