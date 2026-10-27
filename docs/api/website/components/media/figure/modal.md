# `website\components\media\figure\modal.ts`

Expand-modal open for MediaFigure — commits the media descriptor to the store and deep-links the caption slug into the path via replaceState.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\media\figure\modal.ts`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `figureSeqSlug`

Resolves the figure's canonical deep-link slug — walks the tree-scope's
`media-figure` elements in document order applying the same
`mediaSlugSeq` numbering the build emit, sitemap, `checkAutoOpenModal`,
and the genie's `figureForUrl` use, then returns this figure's slug.
The raw `slugify(label)` form is NOT written: uncapped labels exceed
the emitted path length and un-ordinaled duplicates point nowhere, so
a reload would never match an item and reopen the modal.

- `@param` c The <media-figure> component being opened.
- `@returns` The canonical media slug, or '' when unslugifiable.

### `openMediaModal`

Opens media modal.

- `@param` c — the component
