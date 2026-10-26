# `shared\scripts\build\stamp-content-signal.mjs`

Firebase `predeploy` step — stamps the AI-usage declaration

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\stamp-content-signal.mjs`     |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DIST`

Repo root — this file sits at shared/scripts/build/.

### `BLOCK_BEGIN`

Marker lines delimiting the stamped allow block — revert keys off these.

### `LEGACY_BEGIN`

Markers of the retired opt-out revision — always stripped, never restamped.

### `BLOCK`

The stamped block — marker-delimited for idempotency + clean revert.

### `collectRobots`

Recursively collects every robots.txt under a directory.

- `@param` {string} dir directory to walk
- `@returns` {string[]} absolute robots.txt paths

### `REVERT`

`--revert` (postdeploy) removes the marker so the tree stays clean.

### `BLOCK_RE`

Revert pattern — the marker-delimited block plus its leading blank line.

### `LEGACY_RE`

Legacy opt-out block — removed unconditionally, regardless of --revert.

### `stamped`

Count of files stamped or reverted this run — logged for diagnostics.
