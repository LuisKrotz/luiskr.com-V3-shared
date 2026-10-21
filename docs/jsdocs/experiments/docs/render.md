# `experiments\docs\render.tsx`

JSX template for &lt;view-docs&gt; — extracted from Docs.tsx.

| | |
|---|---|
| **Source** | `src/experiments\docs\render.tsx` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `docsHref`

Absolute `/docs` route for a manifest-relative path — the canonical URL
every navigation surface (tree rows, grid cards, crumbs) carries as a
real href so crawlers, reader mode, and new-tab gestures all resolve.
- `@param` subPath Manifest-relative path ('' → portal root).
- `@returns` The portal-relative URL.

### `treeHref`

The URL a tree-row click actually lands on: an expanded dir the viewer
sits inside collapses UP one level, so its href mirrors the parent —
every other row maps to its own canonical /docs/<path>.
- `@param` view The host docs view (reads docsPath for the inside check).
- `@param` node The manifest node the row renders.
- `@param` open Whether the dir row is currently expanded.
- `@returns` The destination URL for the row's href.

### `treeNodes`

Recursive tree rows — each node renders a <li> with an anchor (dirs
toggle open AND navigate; files navigate). Real hrefs keep the tree
crawlable and give right-click/new-tab native semantics; plain clicks
stay on the SPA router. Children render inside a nested <ul> only
while the dir is in the host's open-set — per the self-similar
recursion rule the tree walks itself.

### `gridCards`

Grid cards — dirs and files get the generated folder SVG and navigate
into/open the node on click. Rendered as real anchors so the folder
grid is crawlable and new-tab gestures work natively.

### `crumbBar`

Editable breadcrumb strip — each crumb is a jump-to link; the trailing
input carries the full relative path and commits on Enter (Escape
restores the current path).

### `renderDocs`

The docs template — assembled for ViewDocs.render().
