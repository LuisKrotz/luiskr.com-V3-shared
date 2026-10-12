# `website/components/home/about/glitch/session.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/home/about/glitch/session.ts`   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `sizeSession`

Sizes the canvas + caches cover crop, channel ghosts and scan tile.

### `picWrap`

The live picture wrapper inside the shadow root, if rendered.

### `observeResize`

Watches the picture wrapper for geometry changes: the session's device-px
canvas is pinned to `width:100%`, so it must be re-rastered whenever the
CSS box moves (resize, grid reflow, sibling expand) — otherwise the stale
raster stretches into a zoomed/cropped portrait. Skips no-op callbacks.

- `@param` s Live glitch session (rebuilds cover crop + channel ghosts).
- `@param` wrap The wrapper element to observe.
- `@returns` The armed observer, or null where RO isn't available.

### `liveImg`

The live decoded portrait, if the current DOM node is usable —
duck-typed because instanceof HTMLImageElement isn't reliable across
realms (happy-dom exposes the class only on the window it created).

### `armGlitch`

Arms the session: builds the overlay canvas + context against the live
wrapper. Bails quietly when the image isn't decoded, the wrapper is
zero-size, the 2D context is unavailable, or motion is reduced — the
<img> remains as the static fallback. Idempotent — returns true when a
session is already running.

- `@param` host The <about-section> component the session parks on.
- `@param` wrap The live picture wrapper element.

### `healSession`

Re-homes the session after a shadow re-render: the old wrapper/img were
discarded, so the canvas is re-appended to the fresh wrapper and the
geometry + channel ghosts are rebuilt against the new image node.

### `tick`

Self-maintaining tick — always running while mounted:
no session → retry the arm at ~4 Hz (covers lazy image decode
and the first render landing before data).
session detached→ heal against the fresh wrapper/img (re-render-safe).
healthy session → draw the frame.

### `poll`

The un-armed half of the loop: polls at ~4 Hz until the portrait has
decoded enough to arm, then hands off to the session's own raf chain.
