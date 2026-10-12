# `experiments/star-field/engine/frame/fx.ts`

Ambient-life per-frame effects — `pulse` bodies (variable

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/frame/fx.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `updateFx`

Ambient life — the small "alive" behaviors on top of the static chart:
`pulse` bodies (variable stars, pulsars, flaring cores) breathe via a
sine scale oscillation; `cycle` bodies (Earth's glaciation) lerp the
surface tint between the neutral white and the ice-age palette.

- `@param` s Engine state.
