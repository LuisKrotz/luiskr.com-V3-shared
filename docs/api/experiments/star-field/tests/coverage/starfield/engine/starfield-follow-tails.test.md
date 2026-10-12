# `experiments/star-field/tests/coverage/starfield/engine/starfield-follow-tails.test.js`

Coverage tails for frame.ts's floating-origin follow —

|                |                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/tests/coverage/starfield/engine/starfield-follow-tails.test.js` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.                                     |

## Members

### `makeCamera`

Mock camera — only the fields tickFrame touches.

### `makeControls`

Mock OrbitControls — settable target + update spy.

### `makeWorld`

Mock floating-origin world root — a settable translation vector.

### `makeAnchor`

Mock anchor reporting a world position of `s.world.position + local`
— the same composition real scene-graph nodes produce, so the pin
converges instead of accumulating.
