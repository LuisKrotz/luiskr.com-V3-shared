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
