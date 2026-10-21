# `desktop\launcher-main.mjs`

Electron launcher window for setup/run/verify/build.

| | |
|---|---|
| **Source** | `src/desktop\launcher-main.mjs` |
| **UX surface** | Electron main/launcher/preload — wraps dist/ as an installable app. |

## Members

### `scripts`

Maps a launcher button to the shell command that runs it.
Dev server intentionally keeps the process alive; setup/verify/build exit.

### `runCommand`

Spawns a command in the project root, forwarding stdout/stderr lines to
the renderer. On Windows the command is wrapped in cmd /c; on macOS/Linux
it runs under sh -c so the user's PATH and shell profile are respected.
