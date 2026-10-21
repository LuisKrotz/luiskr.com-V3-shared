# `cms\media-convert\CmsMediaConverter.tsx`

&lt;cms-media-converter&gt; — localhost-only batch media

| | |
|---|---|
| **Source** | `src/cms\media-convert\CmsMediaConverter.tsx` |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `IS_LOCALHOST`

Returns whether localhost.
- `@param` localhost — the value

### `CmsMediaConverter`

The CmsMediaConverter component.

### (module scope)

Lifecycle: binds drop-zone + input events, probes the dev-server toolchain.

### (module scope)

Lifecycle: stops polling + revokes object URLs.

### `_stopPolling`

Clears the job-status poll interval.

### `_notify`

Fires a cms-notification toast.

### (module scope)

JSX template for the current phase (delegate — media-convert/render.tsx).
