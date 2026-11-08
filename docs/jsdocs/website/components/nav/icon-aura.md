# `website\components\nav\icon-aura.ts`

The WASM aura over &lt;app-nav&gt;'s strip chips — reuses

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\nav\icon-aura.ts`               |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `TILES`

Tile selector — the two aura-eligible chips inside the strip.

### (module scope)

Host surface — the strip element plus the session field.

### `_navIconAura`

Live aura session (null while unmounted / WebGPU off).

### `mountNavIconAura`

Mounts the ring-fill aura over the strip chips — one instanced
WebGPU canvas on the strip container, two tiles (search + gear).
Pointer enter/leave on each chip drives `setProgress` so the comet
tail sweeps the hovered chip's perimeter. Returns null silently when
WebGPU is off — the static SVG trails stay the visible cue.

- `@param` host the AppNav element
- `@returns` the live aura session, or null

### `destroyNavIconAura`

Tears down the aura session + its canvas.
