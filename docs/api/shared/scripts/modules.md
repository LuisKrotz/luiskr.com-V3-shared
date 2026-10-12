# `shared/scripts/modules.mjs`

Single source of truth for the workspace module registry.

|                |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Source**     | `src/shared/scripts/modules.mjs`                                          |
| **UX surface** | The repo verbs — build, verify, test, docs, i18n, media, setup, scaffold. |

## Members

### `REPO_ROOT`

Absolute repository root (shared/scripts/../..).

### `PLATFORM_MODULES`

Fixed platform modules — ordered so cheap shared suites run first.
`root` is where reports/coverage lands; `src` lists the authored-source
roots (repo-relative) that enter that module's filtered coverage map.

### `discoverModules`

Discovers every workspace module: the fixed platform modules plus each
experiments/<name>/ dir that ships a jest.config.mjs (sorted for
deterministic run order).

- `@returns` {Array<{name:string, root:string, src:string[]}>} module records.
