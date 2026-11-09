# `cms\projects\render.tsx`

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\projects\render.tsx`                   |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `renderProjects`

Renders the projects case-study manager — header card (create/delete/save),
language + project selectors, then, when a project is selected, the editor:
basic fields, cover image/video config, and the per-section paragraph/media
lists delegated to `renderSection` (one call per section index).

- `@param` host — the host component holding `currentProject`
