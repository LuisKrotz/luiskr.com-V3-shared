# `experiments\star-field\tests\coverage\starfield\star\star-render-mock-tails.test.js`

Coverage tails for star/render.tsx — the catalog-mock arms:

|                |                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\tests\coverage\starfield\star\star-render-mock-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                   |

## Members

### `mockBody`

Single catalog body the catalog mock serves — every render arm reads it.

### `mockUnmappedKey`

Group key absent from the label map — exercises the raw-key fallback arm.

### `makeHost`

Component-host stub — only the fields renderStarField reads (_dossier,
_liveText, _selectedId, flags), overridable per test.

### `flatText`

textContent-or-empty accessor — null-safe flattening for assertions.
