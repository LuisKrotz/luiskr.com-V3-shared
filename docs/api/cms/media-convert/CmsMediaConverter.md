# `cms\media-convert\CmsMediaConverter.tsx`

&lt;cms-media-converter&gt; — localhost-only batch media

|                |                                                 |
| -------------- | ----------------------------------------------- |
| **Source**     | `src/cms\media-convert\CmsMediaConverter.tsx`   |
| **UX surface** | Admin bundle — editors for every database node. |

## Members

### `IS_LOCALHOST`

Dev-server gate — the `/api/media-convert` routes only exist on vite's
dev/preview server, so on the deployed site this regex fails and the
component renders its "localhost only" notice instead of the tool.

### `CmsMediaConverter`

<cms-media-converter> — the element facade for the media converter:
holds the phase machine (idle → uploading → converting → done/error),
the queue, the server job handle + poll timer, and the toolchain
report state — delegating to `files.ts` (input collection),
`job.ts` (HTTP + polling), `events.ts` (wiring), `render.tsx` (JSX).

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
