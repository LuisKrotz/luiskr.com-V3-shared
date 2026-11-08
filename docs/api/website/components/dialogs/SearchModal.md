# `website\components\dialogs\SearchModal.tsx`

&lt;search-modal&gt; — the hamburger-menu search dialog: a

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\dialogs\SearchModal.tsx`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `SEARCH_GENIE_CLASSES`

Genie class contract — the search modal's own block, same mechanics as
the preferences/language dialogs (backdrop carries the enter/leave
modifier, the panel scales from store.modalOrigin).

### `SearchModal`

The <search-modal> element — search dialog facade.

### `_isOpen`

Local open state — mirrors store.searchModalOpen via the setter.

### `_closing`

Genie-leave in flight — blocks re-entry and mid-collapse re-renders.

### `_closeBtn`

CloseButtonWebGL on the header ✕ canvas — liquid-fill, WebGL-first.

### `open`

Setter/getter — drives the dialog's open state through the store.

### `isOpen`

Open flag — store getter when available, local state otherwise.

### (module scope)

Store change → open/close the dialog and focus the input on open.

### (module scope)

Releases the WebGL ✕ context with the element.

### (module scope)

Mounts the liquid-fill ✕ on its live canvas (rebuilds on swap).

### (module scope)

Tears the GL context down — close and teardown both release it.

### `close`

Dismisses the dialog — backdrop click, ✕ button or Escape. The
genie-leave collapse back into the trigger plays first, THEN the
closed state commits — committing early would unmount the panel mid-
animation (a hard vanish instead of the zoom-out).

### (module scope)

JSX template — backdrop + panel + the hosted route-search surface.
