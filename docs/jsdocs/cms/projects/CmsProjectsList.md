# `cms\projects\CmsProjectsList.tsx`

CMS projects editor: full case-study editing — project

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\projects\CmsProjectsList.tsx`          |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `CmsProjectsList`

<cms-projects-list> — the element facade for the projects editor:
holds the state (locale, project key list, selected slug, normalized
`currentProject`, saving flag) and delegates to `data.ts` (Firebase
CRUD), `sections.ts` (model normalization + mutations), `events.ts`
(wiring), `render.tsx`/`section-render.tsx` (JSX). Methods are thin
pass-throughs so test spies share the delegated call path.

### (module scope)

Lifecycle: loads the project keys + data.

### (module scope)

Lifecycle: re-binds after render.

### `_notify`

Fires a cms-notification toast.

### `_renderSection`

Section card JSX (delegate — @cms/projects/section-render.tsx).

### `_bindEvents`

Events wiring (delegate — @cms/projects/events.ts).

### (module scope)

JSX template (delegate — @cms/projects/render.tsx).
