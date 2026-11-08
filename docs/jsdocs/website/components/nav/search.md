# `website\components\nav\search.tsx`

The neon terminal glyph for &lt;app-nav&gt;'s search chip — a

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\nav\search.tsx`                 |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `stop`

`stop` bound to a --nav-neon-* CSS prop — presentation attributes can't
resolve custom properties, so the value rides inline style.

### `ref`

`url(#id)` helper for gradient references.

### `NavSearchIcon`

The <nav-search-icon> element — the neon `>_` prompt. The chevron
gradient runs green (tip) to teal (tail); the streak gradient fades
teal into green so each speed line reads as light leaving the prompt.

### (module scope)

Live wasm streak emitter — null until the module loads (CSS loops stay).

### (module scope)

Starts the wasm streak emitter on the prompt's canvas.

### (module scope)

Releases the emitter's listeners, frame loop and wasm memory.
