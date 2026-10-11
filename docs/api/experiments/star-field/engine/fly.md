# `experiments/star-field/engine/fly.ts`

Camera fly-to tween for the star-field engine — when a body

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/fly.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `easeInOutCubic`

Cubic ease-in-out — slow start, fast middle, gentle arrival; the same
curve the site prefers for long camera moves.

### `startFly`

Arms a fly-to tween: destination is `offset` units along the current
camera→body direction (or straight above when the camera is too close
to define a direction), target is the body world position.
- `@param` s Engine state.
- `@param` worldPos Body center in world space {x,y,z}.
- `@param` offset Standoff distance — scaled per body so giants frame wide.
- `@param` done Optional completion callback.

### `updateFly`

Advances the active tween one frame — lerps camera position and the
controls target along the eased progress; clears `s.fly` and fires
`done` when complete.
- `@param` s Engine state.

### `cancelFly`

Cancels an in-flight tween — called on user pointer/wheel input so
manual control always wins over the animation.
- `@param` s Engine state.
