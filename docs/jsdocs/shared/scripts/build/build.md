# `shared\scripts\build\build.mjs`

Production build orchestrator. The package lifecycle runs the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\scripts\build\build.mjs`                    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `runNode`

Runs a local Node build script with inherited terminal output.

- `@param` {string} script script path relative to the repository root
- `@param` {string[]} args optional script arguments
- `@returns` {Buffer | string | null} child-process result

### `runYarn`

Runs a Yarn binary/script without passing through a shell.

- `@param` {string[]} args Yarn command arguments
- `@returns` {Buffer | string | null} child-process result

### `runAsync`

Async variant of runNode — lets independent post-build steps overlap.

- `@param` {string[]} argv executable + arguments
- `@returns` {Promise<void>} resolves on exit 0
