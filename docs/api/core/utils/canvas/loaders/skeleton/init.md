# `core\utils\canvas\loaders\skeleton\init.ts`

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\utils\canvas\loaders\skeleton\init.ts`          |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `activate`

Attaches the shared lifecycle every accelerated path uses once its
renderer is live: resize listener, host ResizeObserver, the
skeleton-layer class, first measure+paint, pool registration, and
the idle-deferred loop start.

- `@param` host The layer whose canvas just gained a working backend.
- `@param` canvas The live overlay canvas — every callsite guarantees it exists.

### `init2d`

Fallback bootstrap — the shared WebGL renderer blitting into the
host's 2D canvas. Runs when WebGPU or the wasm artifact is absent;
a failed acquire falls through to the pure-CSS shimmer (the canvas
is simply dropped).

- `@param` host The layer to bring up on the 2D path.
- `@param` canvas The layer's overlay canvas — every callsite guarantees it exists.

### `init`

Boot: builds the overlay canvas, prefers the wasm artifact (the FIRST-loading crate — this is the loading placeholder itself), falls back to the shared 2D renderer, then the CSS shimmer.
