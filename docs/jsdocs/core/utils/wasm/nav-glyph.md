# `core\utils\wasm\nav-glyph.ts`

Bridge for the nav glyph hover motion. Lazy-loads the

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\wasm\nav-glyph.ts`                        |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### (module scope)

Methods the wasm GlyphFx exposes to the bridge.

### (module scope)

Shape of the wasm-pack glue module the bridge imports.

### (module scope)

Loaded module + its linear memory — null when the artifact is unavailable.

### (module scope)

A live glyph animation — destroy() detaches listeners, loop and wasm memory.

### `runtime`

Cached runtime-load promise — null until first glyph mount, resolves
once so concurrent mounts share a single wasm instantiation.

### `loadGlueModule`

Default glue loader — dynamic-imports the wasm-pack module from the
public artifacts dir (never resolvable under jest).

### `loadRuntime`

Loads the wasm glue once and resolves the shared runtime; any failure
(missing artifact, blocked fetch) resolves null so callers stay on CSS.

- `@param` load Injectable glue importer — tests substitute a stub so the
- `@returns` the runtime, or null when wasm can't be loaded

### `mountNavGlyph`

Mounts the animated glyph on an icon element: finds its canvas in the
shadow root, wakes the emitter on the owning chip's pointer/focus, and
paints the wasm particle records each frame in the two palette colors read
from the icon's own computed neon tokens.

- `@param` host the <nav-*-icon> element that owns the canvas
- `@param` kind NAV_GLYPH.KIND_STREAK or NAV_GLYPH.KIND_SWOOSH
- `@param` colorProps the two --nav-neon-* custom properties to paint with
- `@param` loadModule Injectable glue importer — tests substitute a stub
- `@returns` a session handle, or null when wasm, the canvas or reduced motion rule it out
