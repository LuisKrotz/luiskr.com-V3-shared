# `shared\scripts\build\predeploy.mjs`

Firebase Hosting predeploy chain — the quality gate that a

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\predeploy.mjs`                |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `runNode`

Runs a local Node build script with inherited terminal output.

- `@param` {string} script Script path relative to the repository root.
- `@param` {string[]} args Optional script arguments.
- `@returns` {Buffer | string | null} Child-process result.

### `runYarn`

Runs a Yarn binary/script without passing through a shell.

- `@param` {string[]} args Yarn command arguments.
- `@returns` {Buffer | string | null} Child-process result.
