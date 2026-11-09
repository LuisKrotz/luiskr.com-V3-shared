# `shared\build\vite-scss-tiers.mjs`

Vite plugin implementing `styles.scss?tiers` — the

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/shared\build\vite-scss-tiers.mjs`                  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `ROOT`

Repo root — the sass load path and importer resolution anchor.

### `SASS_LOAD_PATHS`

Sass load path so component sheets resolve @core/sass partials like vite's css pipeline.

### `RCSS_PREFIX`

Public prefix for lazily-delivered tier modules (the rcss chunk group tests it).

### `TIERS_SUFFIX`

The import query this plugin owns — `styles.scss?tiers`.

### `NS`

Internal module namespace — both `?tiers` modules and `virtual:rcss/` ids live under it.

### `compileSheet`

Compiles a scss file through the same pipeline vite applies to `?inline`:
sass with the core/sass load path, then lightningcss minify+prefix when
building (dev ships unminified css like `?inline` does).

- `@param` {string} file absolute .scss path
- `@param` {{sass:any, transform:any, targets:object|undefined, minify:boolean}} env
- `@returns` {Promise<{base:string, tiers:Record<string,string>, guarded:string[]}>}

### `scssTiersPlugin`

The `?tiers` vite plugin factory.

- `@returns` {import('vite').Plugin} vite plugin instance
