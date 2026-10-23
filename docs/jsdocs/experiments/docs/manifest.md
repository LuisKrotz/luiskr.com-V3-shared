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
