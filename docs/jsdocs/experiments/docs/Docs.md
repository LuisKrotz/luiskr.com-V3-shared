# `experiments\docs\Docs.tsx`

&lt;view-docs&gt; — the English-only docs portal route.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\docs\Docs.tsx`                         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `ViewDocs`

The ViewDocs — docs portal route element.

### `docsPath`

Current '/docs/<path>' suffix from the route param.

### `node`

Resolved manifest node for docsPath (null at the portal root).

### `filePayload`

Open file payload state.

### `fileLoading`

File fetch in flight.

### (module scope)

Dirs the treeview shows expanded.

### `navOpen`

Mobile nav-panel open state (the tree collapses under a toggle <1024).

### `_mapZoomed`

Architecture-map zoom modal — the persistent scene canvas re-seats
into the centered glass dialog while open.

### (module scope)

The dialog's animated close button — a CloseButtonWebGL mounted on
the pref-close canvas each render that produces a fresh dialog. The
widget binds click on the parent button; the DOM onClick does the
same, so closeMapZoom must stay idempotent (double-fire safe).

### (module scope)

Focus hand-off consumed by onUpdated: opening the zoom dialog puts
focus on its close button (the expand-modal pattern), closing it
returns focus to the map column's zoom trigger.

### (module scope)

Path whose tree/grid button regains focus after the next re-render —
arrow-key expand/collapse re-creates the DOM, so focus would
otherwise drop to the body.

### (module scope)

The treeview's roving tab stop — path of the single tabindex="0"
row. APG trees take ONE tab stop: Tab enters the widget once,
arrows move inside it. Every other row carries tabindex="-1" so
keyboard users aren't forced through thousands of links.

### (module scope)

Map-column visibility watcher — ≤1024 the aside is display:none and
the scene's rAF loop is paused so hidden canvases cost zero GPU.
The zoom dialog overrides the pause (the modal can open at any
width once the column control exists… but the column only renders

> 1024, so the dialog is reachable only there — the listener still
> keeps the paused flag honest across resizes).

### (module scope)

Bound change handler for _mapMq — removed in onDestroy.

### (module scope)

Document-level istanbul key-nav disposer while a report is open.

### `_docsReady`

Boot-loader lifecycle — the overlay stays up until the portal's first
usable state: manifest resolved, the architecture scene mount
attempted (success or WebGL fallback), and any in-flight file payload
settled. Mirrors the space playground's `_earthReady` contract.

### `_loaderMsg`

Current boot stage copy + percent rendered inside the loader.

### (module scope)

Section nodes parenting the manifest roots — memoized; the group
rows seed open so the grouped tree lands with its members visible
like the flat list it replaced.

### `rootsAsNodes`

Manifest roots grouped under the four section nodes for the
treeview and the portal-root grid.

### `generatedAt`

ISO generated stamp shown under the title.

### `isDirOpen`

Whether a dir path is expanded in the treeview.

### `treeTabIndex`

Roving tabindex for a rendered tree row — '0' only on the current
tab-stop path so the treeview exposes exactly one Tab entry per the
ARIA treeview pattern (IBM widget_tabbable_single).

- `@param` path Manifest path of the row being rendered.

### `treeFocusItem`

Focus landed on a tree row (arrow move, click-focus, or the
_focusPath restore): make it the widget's single tab stop by
flipping tabindex across the live rows — an attribute flip, not a
re-render, so focus never churns mid-gesture.

- `@param` path Manifest path of the focused row.

### `isProtectedView`

Whether the open file sits under a protected source-module root.

### (module scope)

Localized toast copy for the copy guard — componentText already English-falls-back.

### `navigateDocs`

Navigates within the portal — a bare path resolves against /docs.

- `@param` subPath Manifest-relative path ('' → portal root).

### `pickNode`

Grid/tree click — dirs toggle expansion AND navigate so the grid lands
on the folder; files navigate straight to their file route.
Section-group nodes have no route — they only toggle disclosure.

### `pickTreeNode`

Tree-row click — clicking an already-expanded dir collapses it (and,
when the viewer sits inside that folder, navigates back to its parent
so the page state matches the collapsed tree); a closed dir expands
and navigates; files navigate.

### `closeFile`

Back button — navigates to the file's parent folder (or the root).
A non-source index.html IS the folder's open state: its parent dir
re-opens it on entry (_applyPath), so back must climb past the
owning dir to the grandparent — otherwise the button loops on the
same file. Under source roots index.html is a plain file: one level.

### `toggleNav`

Mobile "browse" toggle — shows/hides the tree panel on small screens.

### `openMapZoom`

Map zoom open — the dialog's first-focusable is its close button
(expand-modal pattern: AT/keyboard reach the dismiss affordance
first). The scene canvas re-seats into the dialog stage on the next
render pass — no context loss, no remount.

### `closeMapZoom`

Map zoom close — idempotent: the close button fires this from both
its DOM click and the widget's own listener on the same gesture.
Returns focus to the zoom trigger.

### `toggleMapZoom`

Zoom trigger — toggles the dialog (delegates to the explicit arms).

### `toggleDir`

Expands or collapses a dir in place (keyboard left/right) without navigating.

### (module scope)

Visible tree buttons in DOM order — the arrow-key cursor space for
the treeview pattern (only rendered rows exist, so collapsed
subtrees are naturally skipped).

### `onTreeKey`

ARIA treeview keys on the nav: ↑/↓ move between visible rows, → opens
a closed dir (or descends into an open one), ← closes an open dir (or
focuses the parent). The rows are anchors now — Enter activates
natively, Space is routed to a click since anchors don't activate on
Space like buttons do.

### `onGridKey`

Arrow-key roving on the folder grid — ←/→/↑/↓ step between cards in
DOM order (the grid's column count is layout-derived, so linear
traversal is the robust choice on every breakpoint).

### `onViewKey`

Host-level keys — Escape backs out of the open file (or closes the
mobile nav panel) without leaving the portal.

### `onCrumbKey`

Editable-breadcrumb commit — Enter navigates to the typed path,
Escape restores the input to the live path.

### `onRouteParamChange`

Same-tag navigation (file → sibling): resolves the new path without
tearing down GL/observability state.

### (module scope)

Lifecycle: store sub + path resolution + guards.

### (module scope)

Print-prepare answer — the print adapter fires `printprepare` before
its media walk so generated DOM reaches the readable mirror: the
payload box's rendered form (mermaid SVG diagrams, istanbul tables)
replaces the article's static copy. Cloned canvases are dead buffers
and get stripped — the live canvases inject their own captured
stills during the walk.

### (module scope)

Lifecycle: (re)mounts the GL strip, scene and viewer content.

### (module scope)

Mounts/refreshes the zoom dialog's animated close button on its live
canvas — same mount contract as the preferences/expand-modal close
(the canvas is re-created with each render that produces the dialog,
so a stale handle is destroyed and remounted). No dialog → the
widget is destroyed outright so it holds no GL context slot.

### `_updateLoader`

Mirrors a boot stage into the loader overlay (delegates to loader.ts).

### `_dismissLoader`

Fades + removes the loader overlay (delegates to loader.ts).

### (module scope)

Advances or dismisses the boot loader based on the just-rendered
state: a file fetch in flight reports the file stage and waits;
anything else means the portal is usable — mark ready, report the
final stage, and fade the overlay out. A failed payload fetch (null)
still counts as settled so the loader can never strand the page.

### (module scope)

The persistent scene canvas — created once with its id/class/label
and the `webglcontextrestored` recovery listener, then re-seated by
onUpdated into whichever stage this render produced. Re-parenting a
canvas preserves its WebGL context, so the scene survives renders,
column↔dialog moves and tree toggles without a remount.

- `@returns` The shared scene canvas element.

### (module scope)

Maps a manifest path to the path the scene knows — section groups
are scene nodes ('group/…'), manifest members are scene nodes, but
a bucket root whose children were promoted into a section (the
docs bucket → Documentation) exists only in the URL space, so its
highlight maps to the owning group node.

- `@param` path Manifest-relative docs path.
- `@returns` The scene node's path for the highlight/focus lookup.

### (module scope)

Mounts/remounts the 3D scene on the given canvas. `onLost` marks the
canvas with the scene-off class and clears the handle so a later
`webglcontextrestored` can rebuild it — the portal stays usable the
whole time.

### (module scope)

Pause-state sync — the scene loop halts while the map column is
display:none (≤1024) AND the zoom dialog is closed; at wider widths,
or while the glass dialog is open, the loop runs. Called from
onUpdated, the mq change listener, and toggleMapZoom.

### (module scope)

`webglcontextrestored` handler — rebuilds the scene on the fresh context.

### (module scope)

Lifecycle: disposes guard + GL surfaces.

### (module scope)

Applies a docsPath: resolves the manifest node, auto-expands the
ancestor dirs in the treeview, syncs the page title + JSON-LD graph
(BreadcrumbList + TechArticle/CollectionPage) so every /docs/* route
is crawlable, and kicks the lazy file fetch.

### (module scope)

Lazy file payload fetch → state → innerHTML paint in onUpdated.

### (module scope)

Paints the open payload — media data-URL for images, rendered HTML
for everything else (markdown, JSON trees, sanitized html reports,
code blocks). innerHTML (not the JSX sanitizer) because payloads are
build-time generated markup that needs <pre>/<table>/<style> intact.

### (module scope)

Intercepts anchor clicks inside painted payload HTML — relative links
inside reports (istanbul `../index.html`, sibling file pages) resolve
against the current /docs route and stay inside the SPA; hash and
external links pass through untouched.

### (module scope)

JSX template — lives in render.tsx.
