# `cms\portfolio\data.ts`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\portfolio\data.ts`                     |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### (module scope)

Featured flags propagate into the `related` node — same write in save + sync.

### (module scope)

Loads the portfolio list + the `related/projects` node for the selected
locale — the related map back-fills `featured` for legacy items that
predate the flag on the list itself, and missing dimension arrays get
the FHD-width / mosaic-height token defaults.

- `@param` host — the host component whose `items` slice is filled

### (module scope)

Propagates the non-localized fields (image, link, featured, dimensions)
to every other locale — localized `label`/`description` are preserved
from each target's existing row, matched by list position. Also writes
the featured flags into each locale's `related/projects` node.

- `@param` host — the host component holding the source `items`

### (module scope)

Persists the current locale's portfolio list to Firebase, then runs the
related-projects featured sync so the case-study footer flags agree.

- `@param` host — the host component holding `items` + `selectedLang`
