# `shared/build/docs-portal.mjs`

Docs portal pipeline plugin — `virtual:docs-manifest` carries

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/shared/build/docs-portal.mjs`                                       |
| **UX surface** | Vite machinery every module build consumes — never shipped to a browser. |

## Members

### `docsPortalPlugin`

Builds the docs-portal vite plugin.

- `@param` {object} opts Options.
- `@param` {string} opts.root Repo root the manifest scan resolves against.
- `@param` {boolean} [opts.emitAssets] Emit `docs-content/*.json` payloads into
- `@returns` {import('vite').Plugin} The plugin instance.
