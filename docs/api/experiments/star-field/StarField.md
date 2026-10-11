# `experiments/star-field/StarField.tsx`

&lt;view-star-field&gt; — the star-field experiment route: a

| | |
|---|---|
| **Source** | `src/experiments/star-field/StarField.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_NAME_BY_ID`

Pre-built id → display-name lookup for live announcements.

### `_TIP_BY_ID`

Pre-built id → `{name} · {dist}` hover tooltip text lookup.

### `_DIST_BY_ID`

Pre-built id → distance-label lookup for tooltip upgrades.

### `_ARROW_DELTAS`

Arrow-key → view-rotation delta map — left/right change azimuth,
up/down change polar (up lifts the camera = negative polar step).

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

Re-fetches labels + re-derives the open dossier on locale change.

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

Binds the document-level keyboard map — Escape dismisses (panel,
then drawer) and the arrow keys orbit the camera, so the chart is
fully navigable without pointer input even when nothing inside the
view holds focus.

### `_setSearch`

Search-filter setter — re-renders the navigator list narrowed to
bodies whose catalog name or id contains the query (case-folded),
so 66+ bodies stay browsable. Non-trivial queries also fire the
incremental registry search over the 139k catalogue; the query
guard keeps a slow earlier response from overwriting a newer one.
- `@param` q Raw input value from the drawer search field.

### `_ensureRegistry`

Lazily resolves the registry manifest — fired the first time the
drawer opens or a search starts, so the 139k index metadata costs
nothing for users who never browse the catalogue.

### `_loadMoreRegistry`

Incremental catalogue browsing — fetches the next 1,000-record
shard for a kind and appends it to the drawer's loaded list. Each
shard is one ~100 KB fetch; records accumulate so "load more"
never refetches earlier pages.
- `@param` kind Registry kind (`star`/`exoplanet`/`dso`).

### `_toggleNav`

Opens the drawer and starts the manifest fetch in one gesture.

### `_matchesSearch`

Drawer filter predicate — matches on catalog name or id; an empty
query passes everything.
- `@param` def Catalog entry under test.

### `_selectBody`

Selection entry point — shared by nav buttons and canvas picking:
loads the dossier panel and flies the camera to the body.
- `@param` id Catalog body id.

### `_closePanel`

Closes the dossier panel and clears the selection.

### `_baseStarPath`

Current-route base path — the star-field URL minus a trailing
`/<body>` segment, so deep-link navigation always composes from the
chart root rather than stacking body segments.
- `@returns` The chart base path in the active locale.

### `_syncUrl`

Keeps the address bar in sync with the selection — selecting pushes
`…/<body>` so Back returns to the chart, closing returns to the base
chart URL. Skips when the current route already carries the target
so the param-change echo (`onRouteParamChange`) cannot loop.
- `@param` id Newly selected body id, or null after close.

### `onRouteParamChange`

Router param echo — same-view navigation delivers the new descriptor
here: a valid `body` param selects it (idempotent on repeat), its
absence closes the panel. Unknown ids degrade to the plain chart so
stale or hand-typed URLs never break the view.
- `@param` _route The destination descriptor (unused — reads

### `_applyDeepLink`

Deep-link entry — after the engine reports ready, selects the body
named in the URL (flies the camera + opens the dossier). Falls back
silently to the overview chart on unknown ids.

### `_takeScreenshot`

Downloads the current frame as a PNG.

### `_flyHome`

Returns the camera to the overview pose.

### `_handleHover`

Hover announce — updates the aria-live HUD text when the pointer
crosses a body so screen readers and the HUD chip both learn it.
- `@param` id Hovered body id, or null on leaving.

### `_syncTip`

Tooltip label sync — writes `{name} · {dist}` into the leader-line
tooltip and shows it while a body is hovered; hides it on leave.
Direct DOM writes (like the live region) so per-frame tracking never
triggers a full re-render.
- `@param` id Hovered body id, or null on leaving.
- `@param` text Resolved display text (for the early-return guard).

### `_handleHoverMove`

Per-frame hover tracking — the engine reports the hovered body's
projected canvas-space pixel position every tick; the tooltip root
is translate-positioned so the leader line + label orbit with it.
- `@param` id Hovered body id.
- `@param` x Canvas-space x in px.
- `@param` y Canvas-space y in px.

### (module scope)

Announces a selection through the same live region.
