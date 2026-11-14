# `shared\scripts\build\submit-indexnow.mjs`

IndexNow submission — pushes the entire canonical crawl

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\submit-indexnow.mjs`          |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `REPO_ROOT`

Repo root — this file sits at shared/scripts/build/.

### `URL_LIST_CANDIDATES`

Canonical URL inventory — the shipped artifact first, then its source.

### `REPORT_PATH`

Submission report destination — bundled into dist/deploy-info/.

### `JSON_BATCH_MAX`

Protocol cap on urlList entries per JSON POST.

### `PARAM_CONCURRENCY`

In-flight GET pings — keeps the 11k+ param pass bounded but quick.

### `REQUEST_TIMEOUT_MS`

Hard socket timeout so a hung connection can't stall postdeploy.

### `RETRY_DELAY_MS`

Backoff before the single retry after a 429 / transport error.

### `sleep`

`setTimeout` as a promise — the retry backoff.

### `request`

Fetch wrapper enforcing the timeout and refusing redirects — IndexNow
answers 200/202/4xx directly; a redirecting endpoint would mask a
misconfiguration, so it is recorded rather than followed.

### `loadUrlList`

Loads the canonical URL inventory — prefers the shipped dist copy so
the submission always mirrors the live deploy. Only URLs that parse
and belong to the declared host survive; the endpoint would 422 the
batch on a foreign URL.

### `verifyKeyFile`

Verifies the root key file is live and carries the key — the protocol's
ownership check the endpoint performs on every submission.

### `submitJson`

JSON form — chunks the inventory into ≤10,000-URL urlList bodies and
POSTs each to the endpoint. Returns one result row per batch.

### `submitParamOne`

One param-form ping — `GET ?url=&key=&keyLocation=` with a single retry
after the backoff when the endpoint throttles (429) or the transport
fails. Every other status is final and recorded.

### `submitParam`

Param form — pings every URL through the GET param endpoint.
The concurrency pool is intentionally iterative, not a traversal:
it drains a flat inventory in bounded batches (legitimate per rule 20).

### (module scope)

`run` — the submission pipeline: resolve flags → load inventory →
verify the key file → run the selected form(s) → write the report.
No flag = both forms (json AND param for every route).
