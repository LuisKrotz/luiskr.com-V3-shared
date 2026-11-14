# `shared\scripts\verify\security-scan.mjs`

Dependency vulnerability scan. Primary engine: Snyk

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\verify\security-scan.mjs`           |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `loadExceptions`

`loadExceptions` — the accepted-risk list from
security-exceptions.json; absent file means no exceptions.

### `isExcepted`

`isExcepted` — does this vuln match an accepted-risk entry?
Wildcards ('_') match any package/advisory; a vuln with no
advisoryId can only be matched by a '_' advisory exception.

### `runSnyk`

Runs the real Snyk CLI; returns parsed JSON or null on any failure.

### `normalizeSnyk`

`normalizeSnyk` — maps the raw `snyk test --json` shape onto the
report's uniform vuln shape (same fields yarn audit fills below,
so downstream code never cares which engine ran).

### `normalizeYarnAudit`

`yarn audit --json` emits NDJSON — one JSON object per line: `auditAdvisory`
records (resolution path + advisory payload) and a closing `auditSummary`.
Parse line-by-line and map each advisory to the report's vuln shape.

### `tally`

`tally` — severity histogram for the report's `totals` block.

### `main`

`main` — the scan pipeline: pick an engine (snyk when the token
exists, yarn audit otherwise), normalize, tag accepted risks,
write the report, and gate the process on actionable findings.
