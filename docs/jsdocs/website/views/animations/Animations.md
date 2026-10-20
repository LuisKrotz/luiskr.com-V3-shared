# `website/views/animations/Animations.tsx`

&lt;view-animations&gt; — the animations-reference route: lists

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/views/animations/Animations.tsx`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

The pages.animations chrome copy — title + meta/intro description.

### (module scope)

One animations record — components.animations.<id>.

### `ViewAnimations`

The ViewAnimations — animations class.

### (module scope)

Lifecycle: kicks off document loading.

### (module scope)

Reloads when the locale changes.

### `loadData`

Fetches the animations page chrome node (title + description) for the
current locale — the record list itself streams from the components
dictionary which is already loaded globally. The route's meta
description rides the fetched node so the tag carries the localized
text, not the booted shell's.

### (module scope)

JSX template — two states: loaded renders the title, intro paragraph and
one definition-list row per animation record (alt = term, longdesc =
definition); loading renders skeleton rows mirroring the real geometry.
Each record carries `id` so an entry is deep-linkable.
