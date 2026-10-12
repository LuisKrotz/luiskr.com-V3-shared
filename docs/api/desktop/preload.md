# `desktop/preload.mjs`

|                |                                                                     |
| -------------- | ------------------------------------------------------------------- |
| **Source**     | `src/desktop/preload.mjs`                                           |
| **UX surface** | Electron main/launcher/preload — wraps dist/ as an installable app. |

## Members

### (module scope)

Preload script for the desktop launcher window. Exposes a minimal,
namespaced API so the renderer can request a yarn command and receive
streamed output without full node integration.

### `run`

Request that the main process run a yarn script. Returns immediately
with the process pid; output streams through `onOutput`.

- `@param` {string} script - one of setup|dev|verify|build|desktop:dev

### `onOutput`

Register a callback for command output lines.

- `@param` {(line: string) => void} callback
