# `shared\scripts\serve\preview-h2.mjs`

HTTP/2 + brotli static preview for the production build —

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\serve\preview-h2.mjs`               |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `MIME`

Content-Types for every artifact class under dist/. Kept local to this
script (the same map lives in vite.config.js for the h1 preview plugin);
a shared table would couple a server script to the bundler config.

### `ensureCert`

Generate the self-signed localhost pair on first use (same recipe vite.config uses).

### `resolveFile`

Resolves a request path to a dist file the way Firebase Hosting does:
`/dir/` → `/dir/index.html`. Returns null when nothing matches.

- `@param` {string} reqPath Decoded pathname.
- `@returns` {string | null} Absolute file path, or null.

### `shouldRedirect`

Mirrors Firebase Hosting's clean-URL handling — the same rule the
`preview-clean-urls` vite plugin encodes for `vite preview`: an
extensionless non-trailing-slash path 301s to `<path>/` when that
directory index exists on disk.

- `@param` {string} reqPath Decoded pathname.
- `@returns` {boolean} True when the request should redirect to `${reqPath}/`.

### `COMPRESSIBLE`

MIME classes worth a dynamic encode — Firebase Hosting gzips every
text-shaped response that lacks a precompressed sibling (public/-copied
JSON like media-manifest.json, service-worker.js), so the preview
mirrors that for the same MIME set instead of serving raw bytes the
wire would never carry.

### `DYNAMIC_COMPRESSION`

`${filePath}|${encoding}` → compressed Buffer for sibling-less text
assets — Lighthouse hits each URL several times, so the one-shot
encode result is memoized rather than re-deflated per request.

### `CACHE_RULES`

Cache-Control contract mirrored from firebase.json — Firebase applies
every matching header block and the LAST match wins, so cacheControlOf
scans the whole table instead of first-matching. Order mirrors the
hosting config: path-prefixed rules first, extension rules after.

### `cacheControlOf`

Resolves the Cache-Control value Firebase would emit for `reqPath`,
or null when no hosting rule covers it (meta JSON, sitemaps, txt).

- `@param` {string} reqPath Decoded pathname.
- `@returns` {string | null} Header value.
