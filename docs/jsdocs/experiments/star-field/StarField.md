# `experiments/star-field/StarField.tsx`

&lt;view-star-field&gt; — the star-field experiment route: a

| | |
|---|---|
| **Source** | `src/experiments/star-field/StarField.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_NAME_BY_ID`

Pre-built id → display-name lookup for live announcements.

### `StarField`

The StarField — a full-viewport explorable star chart.

### `_getCanvasEl`

The render canvas the engine draws into — kept across re-renders.

### (module scope)

Lifecycle: subscribes, mounts the canvas, loads labels, boots the engine.

### (module scope)

Lifecycle: re-mounts the canvas after re-render + re-inits if needed.

### (module scope)

Lifecycle: destroys the engine and unbinds the Escape handler.

### (module scope)

Re-fetches labels when the store pushes a locale change.

### `_loadTranslations`

Loads the star-field label translations via SWR.

### `_applyTranslations`

Stores the fetched pages/star-field node and re-renders.

### `_updateLoader`

Mirrors engine bootstrap progress into the loader overlay.

### `_initEngine`

Creates the engine with ready/select/approach/hover callbacks.

### `_dismissLoader`

Hides the loading overlay after the first usable frame.

### `_bindKeys`

Binds the Escape-key dismisser (closes panel, then the drawer).

### `_toggleNav`

Toggles the navigator drawer open/closed.

### `_selectBody`

Selection entry point — shared by nav buttons and canvas picking:
loads the dossier panel and flies the camera to the body.
- `@param` id Catalog body id.

### `_closePanel`

Closes the dossier panel and clears the selection.

### `_takeScreenshot`

Downloads the current frame as a PNG.

### `_flyHome`

Returns the camera to the overview pose.

### `_handleHover`

Hover announce — updates the aria-live HUD text when the pointer
crosses a body so screen readers and the HUD chip both learn it.
- `@param` id Hovered body id, or null on leaving.

### `_announce`

Announces a selection through the same live region.
