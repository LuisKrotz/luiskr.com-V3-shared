# `core\utils\wasm\wasm-diagram.ts`

Lazy loader for the `rust/diagram` wasm engine — the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\wasm\wasm-diagram.ts`                     |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `GLUE_URL`

wasm-pack glue module URL — resolved lazily, never at import time.

### (module scope)

The generated glue's surface — `default` is `init()` and the named
export is the renderer from `rust/diagram/src/lib.rs`.

### `default`

Instantiates the .wasm next to the glue file.

### `render_diagram`

source + theme JSON → `<svg>` markup; throws on unsupported input.

### `engine`

Cached engine promise — the ~130KB wasm loads at most once.

### `loadDiagramModule`

Default glue loader — dynamic-imports the wasm-pack module from
`/wasm/diagram/`. `/* @vite-ignore *` keeps vite from resolving the
public-dir URL at build time.

- `@returns` The glue module (`default` = init, `render_diagram` = draw).

### `renderDiagram`

Loads (once) and runs the diagram engine.

- `@param` source Raw mermaid source — `flowchart`/`graph`/`sequenceDiagram`.
- `@param` themeJson `Theme::from_json` payload — `{font,fontSize,fg,bg,line,accent,surface}`.
- `@param` loadModule Injectable glue loader — tests substitute a stub so
- `@returns` SVG markup string, ready for `innerHTML`.
