# `cms\projects\section-render.tsx`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\projects\section-render.tsx`           |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `renderSection`

Renders one editable project-section card — a header with reorder/remove
controls, then two subsections: the paragraph textareas and the media
rows (thumbnail + filename/label/type/width/height + remove).
`normalizeSection` splits the mixed section array into parallel
`texts`/`media` lists; `data-sec` + `data-tidx`/`data-midx` let the
delegated handlers in `events.ts` write back to the right slot.

- `@param` host — the host component (folder prefix for `gcs` thumbnails)
- `@param` sec — the section model (mixed text/media array)
- `@param` sIdx — zero-based section index
- `@param` total — total section count (disables "down" on the last card)
