# `website/components/home/mosaic/burn/loop.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/home/mosaic/burn/loop.ts`       |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `teardownBurn`

Final session teardown — restores the DOM title's ink, drops the burn
canvas + rewrite slot, and detaches the session from its card. Runs
when a reversed (rebuild) pass reaches progress 0; the pristine raster
painted that frame is pixel-identical to the restored DOM text, so the
handoff is seamless.

- `@param` s The finished session — torn down in place.

### `frame`

One combustion frame: rebuild the burned paper (char → glow → consume,
per letter), blit it, spawn + draw particles. When every letter's front
has passed its ink top the title is ash; the loop idles until the last
particle dies. Reversed sessions (dir −1) count progress down — the
stage climbs bottom→top again, re-inking each letter base-to-cap
while deposit particles rain onto the moving edge until the raster
is whole again and the DOM takes the pixels back.

- `@param` s The live session — self-reschedules on requestAnimationFrame.
