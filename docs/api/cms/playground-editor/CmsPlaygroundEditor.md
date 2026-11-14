# `cms\playground-editor\CmsPlaygroundEditor.tsx`

&lt;cms-playground-editor&gt; — playground + slugs editor:

|                |                                                     |
| -------------- | --------------------------------------------------- |
| **Source**     | `src/cms\playground-editor\CmsPlaygroundEditor.tsx` |
| **UX surface** | Admin bundle — editors for every database node.     |

## Members

### `CmsPlaygroundEditor`

<cms-playground-editor> — the element facade for the playground/slugs
editor: holds the three data slices (ordered label keys + values, the
typed `epDefaults` control-seed map, per-locale `slugs`) and delegates
to `data.ts` (Firebase load/save/key CRUD), `events.ts` (wiring),
and `render.tsx` (JSX). Methods are thin pass-throughs for the same
shared call path the tests spy on.

### (module scope)

Lifecycle: loads playground data.

### (module scope)

Lifecycle: re-binds after render.

### `loadAllData`

Reads the playground + slugs nodes for all locales.

### `saveAll`

Writes edits back to Firebase.

### `addEpKey`

Adds a new playground label key.

### `removeEpKey`

Removes a playground label key.

### `_notify`

Fires a cms-notification toast.

### `_bindEvents`

Wires all inputs/buttons.

### `_renderLabelRows`

JSX for the playground label key rows.

### `_renderDefaults`

JSX for the playground control defaults (typed per stored value).

### `_renderSlugRows`

JSX for the per-locale slug editor rows.

### (module scope)

JSX template.
