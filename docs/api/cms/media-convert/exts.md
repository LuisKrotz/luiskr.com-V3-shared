# `cms\media-convert\exts.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\media-convert\exts.ts`                 |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `VIDEO_EXTS`

Video extensions the pipeline normalizes into h264 mp4 + scaledown + posters.

### `PDF_EXTS`

Document extensions the pipeline rasterizes — each PDF's pages are
merged into one tall PNG plus a small first-page thumbnail.

### `MEDIA_EXTS`

Union of every accepted extension — the drop-time filter.

### `isMediaPath`

Reports whether a file name/path carries a supported media extension.
Extension check is case-insensitive; names with no dot, dotfiles
(.DS_Store) and unknown extensions all report false so OS litter inside
dropped folders never reaches the queue.

- `@param` name — file name or relative path
- `@returns` true when the extension is a known image, video or document format
