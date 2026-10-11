# `cms/media-convert/consts.ts`

| | |
|---|---|
| **Source** | `src/cms/media-convert/consts.ts` |
| **UX surface** | Batch image→WebP conversion pipeline UI. |

## Members

### `API_BASE`

Dev-server API mount point for the conversion endpoints — sole
declaration site for this literal.

### `PHASE`

Job state machine: idle → uploading (per-file PUTs) → converting
(server pipeline) → done | error. The component render switches on this.

### `POLL_MS`

Job-status poll cadence — fast enough for live progress, light on the dev server.

### `MIME_HINT`

File-picker accept filter covering every input format ffmpeg accepts.

### `EMPTY`

Re-export of the shared empty-string token for this module's API.

### (module scope)

One queued upload — the File blob plus its job-relative path.

### `file`

The picked File payload (PUT body).

### `rel`

Path relative to the job root — sent as the x-file-path header.

### `TOOL_ROWS`

Tool rows rendered by the setup panel — [label, tools-map keys]. Order
is display order; required entries block conversion when missing.
`imagemagick` collapses the platform split: `magick` (win32/IM7) or
`convert` (POSIX/IM6) both satisfy it.

### (module scope)

Server payload from GET /api/media-convert/tools (shared/scripts/media-convert/install.js).

### (module scope)

OS the dev server runs on ('linux'|'darwin'|'win32').

### (module scope)

Per-binary presence flags keyed by executable name.

### (module scope)

Missing-tool groups (ffmpeg, imagemagick, cjpeg).

### (module scope)

Detected package manager (or null when none found).

### (module scope)

Install plan — runnable commands vs. manual guidance.

### (module scope)

Per-file outcome reported by the conversion server.

### `ok`

Whether this file converted successfully.

### `in`

The input path the result corresponds to.

### (module scope)

Output artifact paths when ok.

### (module scope)

Error message when !ok.

### (module scope)

Job-status payload polled from GET /jobs/:id.

### (module scope)

Server phase string ('running'|'uploading'|terminal).

### (module scope)

Server-side error message when failed.

### (module scope)

Currently-processing file path (progress display).

### (module scope)

Files completed so far.

### (module scope)

Total files in the job.

### (module scope)

Per-file results once the job settles.
