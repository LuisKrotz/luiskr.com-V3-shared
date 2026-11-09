# `cms\media-convert\files.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\media-convert\files.ts`                |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### (module scope)

Recursive async generator over a dropped FileSystemEntry — a folder
drop yields one {file, rel} per descendant, preserving the relative
path so the server rebuilds the same tree inside the ZIP. Directory
readers return entries in batches of ≤100, so the do/while drains
until an empty batch signals the end.

### `fmtBytes`

Humanizes a byte count — MB above 1MB (1 decimal), KB below (min 1KB so 0-byte files don't print "0 KB").

### (module scope)

Collects a drag-drop payload into the queue — prefers the
`webkitGetAsEntry` path so a dropped folder recursively yields
`{file, rel}` per descendant (preserving the tree the server rebuilds
inside the ZIP); falls back to flat `dataTransfer.files` when entries
aren't available. `isMediaPath` filters out non-media files.

### `collectInput`

Collects a `<input type=file>` selection — `webkitRelativePath`
preserves subfolder structure when the picker was given a directory;
otherwise the bare filename is the rel path. Same `isMediaPath` filter.

- `@param` host — the host component whose `queue` receives the items
- `@param` input — the file input element that fired change
