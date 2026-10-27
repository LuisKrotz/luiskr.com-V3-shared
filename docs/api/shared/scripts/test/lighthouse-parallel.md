# `shared\scripts\test\lighthouse-parallel.mjs`

Parallel replacement for `lhci autorun`'s collect phase.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\test\lighthouse-parallel.mjs`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `urls`

URL list + run count straight from lighthouserc.cjs — single source of truth.

### `chromeFlags`

Chrome flags the preview cert needs, plus the flags collect itself declares.

### `ensureServer`

Preview-server lifecycle: reuse a server already on :4173 (a dev session
may own it), otherwise spawn startServerCommand and wait for readiness.

- `@returns` {Promise<{child: import('node:child_process').ChildProcess|null}>}

### `runJob`

One Lighthouse run as a subprocess — isolated Chrome per job, JSON
report straight into .lighthouseci/ in lhci's lhr-* naming.

- `@param` {string} url route to measure
- `@param` {string} outPath report destination
- `@returns` {Promise<void>} resolves on exit 0

### `runJobWithRetry`

Parallel Chrome launches flake intermittently (NO_NAVSTART trace
failures, renderer OOM) — retry a couple times before surfacing so one
flake can't drop a URL's median sample.

- `@param` {string} url route to measure
- `@param` {string} outPath report destination
- `@param` {number} attempts total attempts allowed
- `@returns` {Promise<void>} resolves on the first successful attempt
