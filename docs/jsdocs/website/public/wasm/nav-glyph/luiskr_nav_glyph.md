# `website\public\wasm\nav-glyph\luiskr_nav_glyph.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\public\wasm\nav-glyph\luiskr_nav_glyph.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `GlyphFx`

One glyph's particle system — construct once per icon, `step` per frame.

### `alive`

Live particle count — JS stops the frame loop once this and energy are 0.

- `@returns` {number}

### `data_len`

Float count of the output buffer (POOL * STRIDE).

- `@returns` {number}

### `data_ptr`

Address of the output buffer inside wasm linear memory.

- `@returns` {number}

### `energy`

Current activity energy in [0, 1].

- `@returns` {number}

### `constructor`

Creates an idle emitter of `kind` (KIND_STREAK / KIND_SWOOSH) seeded for
deterministic jitter.

- `@param` {number} kind
- `@param` {number} seed

### `set_active`

Sets the wake target: true eases energy up (emission on), false eases it
back to rest while live particles finish their travel.

- `@param` {boolean} on

### `step`

Advances the simulation by `dt` seconds and rewrites the output buffer.

- `@param` {number} dt
