# `experiments/star-field/engine/frame/fx.ts`

Ambient-life per-frame effects — `pulse` bodies (variable

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/frame/fx.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `solarWindAt`

Solar-wind level — the shared activity signal every wind-touched
system reads from `s.solarWind`/`s.fxTime`: a slow BASE+WAVE swell
(the ~11-year-style activity cycle compressed to scene seconds) plus
sharp storm spikes from two detuned sines raised to a high power —
rare, brief, bright gusts that make auroras ignite and flares leap.

- `@param` t Scene seconds.
- `@returns` Activity level (0 quiet … ~1.5 storm).

### `updateFx`

Ambient life — the small "alive" behaviors on top of the static chart:
`pulse` bodies (variable stars, pulsars, flaring cores) breathe via a
sine scale oscillation; `cycle` bodies (Earth's glaciation) lerp the
surface tint between the neutral white and the ice-age palette.

- `@param` s Engine state.

### `gasI`

Streaming gas — each tail's filament layer scrolls its texture
along +x (the anti-sunward direction, via RepeatWrapping
`map.offset.x`), wobbles a few hundredths of a radian and
flickers on a detuned sine, so the tail reads as churning
plasma/dust blowing off the nucleus instead of a painted streak.
The gas sprite shadows the base tail's position/scale by copying
the rescaled length each frame.
