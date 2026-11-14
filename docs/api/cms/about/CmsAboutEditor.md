# `cms\about\CmsAboutEditor.tsx`

CMS about-page editor: bio paragraphs per column, the

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\about\CmsAboutEditor.tsx`              |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `CmsAboutEditor`

<cms-about-editor> — the element facade for the About editor: holds
the state (selected locale, Gravatar size, saving/syncing flags, and
the `aboutData` model) and delegates every behavior to the sibling
modules — `data.ts` (Firebase), `model.ts` (mutations), `events.ts`
(wiring), `render.tsx` (JSX). Methods below are thin pass-throughs so
test spies and the delegated modules share one call path.

### (module scope)

Lifecycle: loads the about data and binds events.

### (module scope)

Lifecycle: re-binds after each re-render.

### `_notify`

Fires a cms-notification toast.

### (module scope)

JSX template (delegate — @cms/about/render.tsx).
