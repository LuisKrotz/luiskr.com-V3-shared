# `shared\scripts\build\stamp-content-signal.mjs`

Firebase `predeploy` step — stamps the AI-usage opt-out

| | |
|---|---|
| **Source** | `src/shared\scripts\build\stamp-content-signal.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DIST`

Repo root — this file sits at shared/scripts/build/.

### `BLOCK_BEGIN`

Marker lines delimiting the stamped block — revert keys off these.

### `AI_AGENTS`

AI training / AI-input crawlers — each becomes its own
`User-agent: X / Disallow: /` group. Deliberately excludes search
crawlers (Googlebot, Bingbot, OAI-SearchBot, DuckDuckBot): the signal
is `search=yes`, only training and AI-answer input are refused.

### `BLOCK`

The stamped block — marker-delimited for idempotency + clean revert.

### `collectRobots`

Recursively collects every robots.txt under a directory.
- `@param` {string} dir directory to walk
- `@returns` {string[]} absolute robots.txt paths

### `REVERT`

`--revert` (postdeploy) removes the block so the tree stays clean.

### `BLOCK_RE`

Revert pattern — the marker-delimited block plus its leading blank line.

### `stamped`

Count of files stamped or reverted this run — logged for diagnostics.
