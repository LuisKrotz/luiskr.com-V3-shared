# `shared/build/vite-lib.mjs`

Shared factory for the per-module Vite library builds. Every

|                |                                                                          |
| -------------- | ------------------------------------------------------------------------ |
| **Source**     | `src/shared/build/vite-lib.mjs`                                          |
| **UX surface** | Vite machinery every module build consumes — never shipped to a browser. |

## Members

### `MODULE_ALIASES`

The canonical alias map — single declaration consumed by every module
config so a moved folder only ever changes here and in the root config.

### `EXTERNALS`

Runtime specifiers that must never be inlined into a module bundle.

### `hostContextSafeLogger`

Vite logger that drops the lightningcss :host-context() notice only.
lightningcss's selector parser doesn't know :host-context() yet — the
emitted CSS is byte-identical correct (rules pass through untouched, and
errorRecovery keeps them in the output), so the "not recognized" notice is
pure log noise. Filter exactly that pattern; every other warning keeps
surfacing.

- `@returns` {import('vite').Logger} Logger with the host-context warning filtered.

### `moduleConfig`

Builds a Vite library config for one module folder.

- `@param` {object} opts Options.
- `@param` {string} opts.dir Absolute path of the module folder.
- `@param` {string} opts.name Bundle file stem emitted under dist/.
- `@param` {string} [opts.entry] Barrel entry relative to `dir` (default index.ts).
- `@param` {string} [opts.target] esbuild/terser target — cms passes 'esnext'
- `@returns` {import('vite').UserConfig} The module build config.
