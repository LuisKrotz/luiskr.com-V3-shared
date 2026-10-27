# `experiments\docs\render.tsx`

JSX template for &lt;view-docs&gt; — extracted from Docs.tsx.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\docs\render.tsx`                       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `docsHref`

Absolute `/docs` route for a manifest-relative path — the canonical URL
every navigation surface (tree rows, grid cards, crumbs) carries as a
real href so crawlers, reader mode, and new-tab gestures all resolve.

- `@param` subPath Manifest-relative path ('' → portal root).
- `@returns` The portal-relative URL.

### `mapLoadingVeil`

Map-stage loading veil — status-labelled spinner + caption covering the
canvas seat while the scene's async graph build (worker layout →
geometry/label upload) runs. Both stage hosts (the column and the zoom
dialog) emit the identical subtree so the veil follows the persistent
canvas on a mid-build re-seat.

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
grid is crawlable and new-tab gestures work natively; each card sits
inside an h3 so every listed document is a real heading AT heading-jump
(and crawlers) can enumerate.

### `_indexView`

The view the memoized index links delegate navigation to.

### `_indexEl`

The built-once index subtree (all manifest nodes as heading/link rows).

### `indexLink`

Index link for one manifest node — a real /docs/<path> anchor (crawlable,
new-tab friendly) carrying its path for the nav's delegated click handler.
`tabindex="-1"` keeps it out of sequential focus (see block comment).

- `@param` path Manifest-relative path the link navigates to.
- `@param` label Anchor text (node name / bucket label).
- `@returns` The anchor element.

### (module scope)

Recursive index entries — dirs yield a heading wrapping their canonical
link (level 3 + depth capped at h6, so the ladder mirrors the tree:
bucket h3 → h4 → h5 → h6), files yield the bare anchor. The links land
in document order directly under the nav: each file's anchor reads as
belonging to the preceding dir heading, keeping every document reachable
from both the AX tree and crawlers without a heading per file.

- `@param` nodes The manifest nodes at this depth.
- `@param` depth 1-based depth below the bucket heading.

### (module scope)

Streams the section groups + member subtrees — an h3 label per group
(sections are disclosure-only, so the heading carries no link), then
each member's nodes in document order (dirs as heading links one level
under the group, files as bare anchors). Generator shape per the
self-similar-traversal rule; the puller controls pacing.

- `@param` groups The four section nodes parenting the manifest roots.

### `scheduleIndexSlice`

Schedules one index slice in the next idle gap — requestIdleCallback
with a starvation bound where it exists, a bare setTimeout otherwise.
The timeout guarantees the tree completes even on a continuously busy
main thread.

- `@param` cb The slice to run.

### `pumpIndex`

Pulls INDEX_CHUNK elements per slice into a DETACHED DocumentFragment —
each slice is pure createElement work with zero style/layout cost since
the fragment is not connected. On completion the whole tree attaches to
the nav in ONE insertion, so the multi-thousand-node layout pass happens
once (and with the nav's content-visibility skip, barely even then).
Runs to completion regardless of view lifetime: the element is memoized
module-level and re-attaches on the next render.

- `@param` gen The index element stream.
- `@param` nav The index nav the finished fragment attaches to.
- `@param` frag Detached fragment accumulating nodes between slices.

### `docsIndex`

The complete document index — an sr-only nav listing every manifest node
(dirs as heading links, files as bare anchors) so AT heading navigation
gets the tree's shape and link navigation/crawlers/agents reach all docs
without unfolding the tree. The nav shell mounts synchronously; the
~8k-node body streams in over idle slices so first paint and input
tasks never pay the full attach. Memoized — re-attached on subsequent
renders; real DOM so crawlers index it.

- `@param` view The host view (links delegate navigation to it).
- `@returns` The memoized index nav element.

### (module scope)

Editable breadcrumb strip — each crumb is a jump-to link; the trailing
input carries the full relative path and commits on Enter (Escape
restores the current path).

### `crumbBar`

Editable breadcrumb strip — each crumb is a jump-to link; the trailing
input carries the full relative path and commits on Enter (Escape
restores the current path).

### `renderDocs`

The docs template — assembled for ViewDocs.render().
