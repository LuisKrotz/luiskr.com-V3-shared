# `cms\media-convert\events.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\media-convert\events.ts`               |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `bindEvents`

Binds the media-converter's events — the drop-zone drag trio
(dragover paints the `--over` state, dragleave clears it only when the
pointer leaves the zone itself, drop collects the DataTransfer), the
hidden file input, and the single-purpose buttons: run/reset, tools
install + recheck, clear queue, and the ZIP download that deletes the
server job after a short grace period.

- `@param` host — the host component exposing `addScopedListener` + `$`/`$$`
