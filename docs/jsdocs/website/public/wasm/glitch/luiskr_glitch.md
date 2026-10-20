# `website/public/wasm/glitch/luiskr_glitch.js`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/public/wasm/glitch/luiskr_glitch.js`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `Glitch`

Public wasm surface — one glitch canvas per portrait.

### `frame`

`frame` — advance the clock + RNG, repack the uniform, draw.

The RNG: one xorshift32 step per frame — `x ^= x<<13; x ^= x>>17;
x ^= x<<5` (Marsaglia) — maximal period 2³²−1, three shifts of
state. The seed goes down as an f32; the shader bitcasts it
back to u32 for the hash mixer (bit-exact round trip — the
seed's low 24 bits are the only ones that survive f32, which is
why the mixer uses the HIGH bits via the second shift).

- `@param` dt Frame delta in seconds (roll-bar clock).
- `@returns` false once the surface is stale/lost.
- `@param` {number} dt
- `@returns` {boolean}

### `init`

`init` — device + pipeline + sampler; the bind group builds
once the portrait lands (`upload` → `rebind`).

- `@param` canvas The overlay canvas (positioned over the <img>).
- `@param` device The shared GPUDevice (one per page, from the JS bridge).
- `@returns` Ok on a live surface, Err(JsValue) on failure.
- `@param` {HTMLCanvasElement} canvas
- `@param` {GPUDevice} device

### `constructor`

`Glitch::new` — un-initialized widget; `init` must follow.

The RNG seeds from a fixed constant — determinism is a feature:
replayed corruption is stable across mounts, and entropy comes
from the frame counter, not wall time.

### `resize`

`resize` — device px — the `res` uniform (corruption math is
px-native: band heights, tear distances, grain).

- `@param` w @param h Backing size in device pixels.
- `@param` {number} w
- `@param` {number} h

### `set_cover`

`set_cover` — push the cover-fit dest rect (device px) — the
DOM `coverRect()` parity value so the shader's frag→uv mapping
matches `object-fit: cover` + `object-position` exactly.

- `@param` dx @param dy Dest rect origin (device px).
- `@param` dw @param dh Dest rect size (device px).
- `@param` {number} dx
- `@param` {number} dy
- `@param` {number} dw
- `@param` {number} dh

### `set_hover`

`set_hover` — the intensity latch: 0 = idle ambient, 1 = full
VHS. Mirrors `session.hover`.

- `@param` hover 0 or 1.
- `@param` {number} hover

### `set_size`

`set_size` — CSS px (kept for bridge contract parity; the
shader reads device px from `resize` only).

- `@param` _w @param _h CSS size — unused.
- `@param` {number} _w
- `@param` {number} _h

### `upload`

`upload` — stage the decoded portrait. `ImageBitmap` input —
the browser decodes off-main-thread and
`copyExternalImageToTexture` moves pixels GPU→GPU, so no CPU
pixel round-trip ever touches the glitch path.

NOTE on CORS: the portrait is cross-origin — the copy REQUIRES
the image be fetched with `crossorigin` or the bitmap is
tainted and the copy throws. The JS arm catches that and keeps
the 2D fallback alive — the <img> stays the source of truth.

- `@param` bitmap The decoded portrait (`createImageBitmap(img)`).
- `@returns` true when the texture landed, false before init.
- `@param` {ImageBitmap} bitmap
- `@returns` {boolean}
