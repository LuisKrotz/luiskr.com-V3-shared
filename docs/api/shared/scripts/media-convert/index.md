# `shared\scripts\media-convert\index.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\media-convert\index.js`             |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Localhost-only media converter API — a Vite plugin exposing job-based
upload → convert → zip-download endpoints on the dev/preview servers.
It is never part of the built bundle, so the feature cannot exist in
production even if the CMS front-end is reached.

Endpoints (all under /api/media-convert):
POST /jobs → { id } create temp job dir
PUT /jobs/:id/files body=file bytes, x-file-path save one input file
POST /jobs/:id/convert → { status:'running' } start async pipeline
GET /jobs/:id → { status,total,done,current,results }
GET /jobs/:id/zip → application/zip all outputs
DELETE /jobs/:id → 204 cleanup temp dir
GET /tools → { platform,tools,missing,manager,plan }
POST /tools/install → { ok,log,report } run install plan

### `json`

`json` — the one JSON response shape every endpoint shares.

### `safeJoin`

`safeJoin` — resolves `rel` under `root` and returns null on any
path that escapes (the upload endpoint's traversal guard: a
client-supplied x-file-path must never write outside in/).

### (module scope)

`pruneStaleJobs` — removes job dirs older than JOB_TTL_MS at
plugin mount, so dead conversions can't fill the temp dir across
dev-server restarts.

### (module scope)

`runJob` — the async conversion loop: walks the job's input tree,
converts each supported file into the mirrored output dir, and
keeps the job record's progress fields live for the status poll.
Per-file failures are recorded, not fatal — one bad input doesn't
kill the batch.

### (module scope)

`walkGen` — recursive generator yielding every file path under
`dir` (the project's traversal convention: yield* recursion, no
hand-rolled stack).

### (module scope)

`walk` — drains the generator into a flat array.

### (module scope)

`handle` — the single middleware behind every route. Dispatches on
(method, sub-path) to the endpoint table documented in the header;
falls through to `next()` for anything that isn't ours.

### `mediaConvertPlugin`

`mediaConvertPlugin` — the Vite plugin factory. Mounts the API on
both the dev server and `vite preview` so the converter works while
reviewing a built bundle locally; it never ships in dist output.
