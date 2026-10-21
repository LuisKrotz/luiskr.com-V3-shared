# `shared/build/docs/scan.mjs`

Filesystem → manifest tree for the docs portal.

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/shared/build/docs/scan.mjs`                                         |
| **UX surface** | Vite machinery every module build consumes — never shipped to a browser. |

## Members

### `DOC_ROOTS`

Publishable roots — `root` is the manifest namespace (also the docs URL
prefix), `dir` the on-disk folder, `label` the display heading shown in
the portal grid, `kind` the behavior class. `skip` is an optional
top-level-only dir-name list excluded from that root's scan — used to
keep already-published subtrees and heavy asset payloads out of a
sibling root.

### `FORMAT_BY_EXT`

Extension → portal format tag.

### `SKIP_DIRS`

Directory entries never published, whatever the format. `tests` and
per-module `reports`/`coverage` trees are reached through their own
dedicated roots instead of leaking into a source bucket.

### `ILLEGAL_NAME`

Entry names that can never be published: characters illegal in Windows
filenames (`* ? " < > | :`) break `git checkout` on win32 clones, and
`?`/`*` inside a URL path segment corrupt query/glob semantics for
crawlers. Typedoc renders ambient `declare module '*.scss'` shims as
directories named after the glob pattern — those must be skipped.

### `MEDIA_INLINE_LIMIT`

Largest media payload inlined as a data-URL (bytes on disk).

### `formatOf`

Resolves a file extension to its format tag; unknown/binary shapes fall
back to 'text' so every listed file still renders as readable HTML.

### `scanDir`

Recursively scans one directory into manifest nodes. Hidden entries and
SKIP_DIRS are dropped before descent; files are sorted dirs-first, then
alphabetically, matching the site-wide recursive-traversal convention.
A root's optional `skip` list applies at the top level only — a module
folder can exclude its own already-published subtrees (shared/docs,
shared/local-modules) or asset payloads (star-field/public) without
filtering same-named folders deeper in the tree (shared/scripts/docs).

- `@param` {string} absDir Absolute directory being walked.
- `@param` {string} baseDir Absolute root dir (for relative ids).
- `@param` {string} root Manifest namespace ('docs'|'reports'|…).
- `@param` {Array<string>} [topSkip] Top-level-only dir names to exclude.
- `@returns` {Array<object>} Child nodes (dirs and files, stable order).

### `scanManifest`

Builds the complete docs-portal manifest.

- `@param` {string} repoRoot Absolute repository root.
- `@returns` {{generated: string, roots: Array<object>}} Manifest object.

### `resolveFileId`

Resolves a manifest `id` ('<root>:<relpath>') back to an absolute path,
with the exclusion rules re-applied so a guessed id cannot escape the
published tree (defense-in-depth next to route sanitization).

- `@param` {string} repoRoot Absolute repository root.
- `@param` {string} id Manifest file id.
- `@returns` {string|null} Absolute path, or null when not publishable.
