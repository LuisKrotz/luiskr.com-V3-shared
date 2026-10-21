# `shared\scripts\build\stamp-content-signal.mjs`

Firebase `predeploy` step — stamps the IETF-draft

| | |
|---|---|
| **Source** | `src/shared\scripts\build\stamp-content-signal.mjs` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DIST`

Repo root — this file sits at shared/scripts/build/.

### `DIRECTIVE`

Directive line inserted directly under `User-agent: *` per the spec.

### `collectRobots`

Recursively collects every robots.txt under a directory.
- `@param` {string} dir directory to walk
- `@returns` {string[]} absolute robots.txt paths

### (module scope)

Count of files stamped this run — logged for deploy diagnostics.

### `stamped`

Count of files stamped or reverted this run — logged for diagnostics.
