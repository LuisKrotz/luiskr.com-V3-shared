# `shared\scripts\verify\security-scan.mjs`

Dependency vulnerability scan. Primary engine: Snyk

| | |
|---|---|
| **Source** | `src/shared\scripts\verify\security-scan.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `runSnyk`

Runs the real Snyk CLI; returns parsed JSON or null on any failure.

### `normalizeYarnAudit`

`yarn audit --json` emits NDJSON — one JSON object per line: `auditAdvisory`
records (resolution path + advisory payload) and a closing `auditSummary`.
Parse line-by-line and map each advisory to the report's vuln shape.
