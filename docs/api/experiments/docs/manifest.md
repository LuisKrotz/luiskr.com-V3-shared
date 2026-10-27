# `experiments\docs\manifest.ts`

Build-time docs manifest access + path resolution.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\docs\manifest.ts`                      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

One manifest node — dir carries children, file carries id + mtime.

### (module scope)

Scene-only flag — `+N` aggregate leaves the leaf cap synthesizes
for surplus file children; the map colors them with the dir ink.

### (module scope)

View-synthesized section node — a disclosure wrapper the portal
tree/grid renders above the real roots (Source Code, Documentation,
Architecture Docs, Reports). Toggles only: no manifest path or
route exists for a section, so group rows never navigate.

### (module scope)

A view-synthesized section node — `buildGroups` always supplies the
children array and flags the node `group: true`, so the section type
narrows both fields required for scene/tree consumers.

### (module scope)

A publishable root bucket (docs / reports / coverage-* / source modules).

### (module scope)

Behavior class emitted by shared/build/docs/scan.mjs: 'source' roots
are protected (copy-guard, no index auto-open); 'coverage' roots are
per-module test reports; 'docs'/'reports' are browsable content.

### (module scope)

Manifest object emitted by the vite plugin.

### (module scope)

Rendered payload returned by /docs-content/<id>.json.

### `hydrateChildren`

Expands one wire children list into manifest nodes. Names and rel-path
overrides resolve through the strings table; `path` is the root name
plus the ancestor rel chain, `id` the same rel under the ':'
namespace, and file `mtime` the epoch-ms value restored to ISO — the
same fields the scan emitted without any of them crossing the wire.

- `@param` tuples Wire children tuples of one parent.
- `@param` wire Full wire manifest (strings table).
- `@param` root Root namespace ('docs' → path/id prefix).
- `@param` parentRel Parent's real rel path ('' at a root's top level).
- `@returns` Hydrated nodes in wire order.

### `hydrateManifest`

Expands the wire manifest into the runtime tree — roots decode their
name/label/kind through the strings table, children hydrate
recursively. Runs once at module init so getDocsManifest() stays a
cheap accessor.

- `@param` wire Compact manifest from virtual:docs-manifest.
- `@returns` The full DocsManifest the portal consumes.

### `getDocsManifest`

The scanned manifest — the vite plugin + jest stub always emit one.

### `_groupParents`

Direct-member path → its section's path (e.g. 'src' → 'group/source').

### `_groups`

Memoized section nodes — the manifest is static per build.

### `buildGroups`

Builds the four portal section nodes. The docs root's children flatten
straight into Documentation (the 'docs' bucket itself is not a tree
row — its URL stays reachable via crumbs/links); the `architecture`
subtree is promoted into its own Architecture Docs section. Source and
reports/coverage roots keep their bucket nodes as section members —
every member carries its real path, so /docs/<path> URLs never change.

- `@returns` Ordered section nodes (empty sections dropped).

### `docsGroups`

The four section nodes that parent the flat manifest roots in the
treeview and the portal-root grid. Built once — the manifest never
changes after hydration.

- `@returns` Ordered section dir-nodes flagged `group: true`.

### `docsGroupParent`

The section-group path containing a manifest path — walks ancestors so
deep paths ('docs/sassdoc/index.html') resolve through their section
member ('docs/sassdoc') to the owning group ('group/docs'). Used to
auto-open the group row for a routed path and to climb Arrow-Left out
of a section member (its real path parent is not a rendered row).

- `@param` path Manifest-relative docs path.
- `@returns` The owning 'group/<id>' path, or undefined outside the tree.

### `docsGeneratedAt`

ISO timestamp of the newest doc file — shown as "last docs update".

### `isSourceRoot`

Whether a manifest root name ('src', 'core', …) is a protected source
bucket — source roots get the copy-guard and never auto-open index.html.

- `@param` rootName First segment of a docs path or file id.
- `@returns` True when the bucket's kind is 'source'.

### `fileIdRoot`

Extracts the root namespace from a manifest file id ('<root>:<rel>').

- `@param` id Manifest file id.
- `@returns` The root name, or '' when the id has no namespace.

### `resolveDocsPath`

Resolves a docs sub-path ('docs/a/b.md' or bare 'a/b' against roots) to
the manifest node. Case-sensitive — the tree mirrors the real fs layout.

- `@param` docsPath Route param from /docs/<path>.
- `@returns` The node, or null when the path doesn't resolve.

### `crumbsForPath`

Breadcrumb segments for a resolved docs path — [{label, path}] from the
portal root down to the node.

- `@param` docsPath Route param from /docs/<path>.
- `@returns` Ordered crumb trail.

### `fetchDocsFile`

Lazily fetches one rendered file payload. Ids come straight from the
manifest, so the URL is encoded segment-wise — never user-derived.

- `@param` id Manifest file id ('<root>:<relpath>').
- `@returns` Parsed payload, or null on 404/network failure.
