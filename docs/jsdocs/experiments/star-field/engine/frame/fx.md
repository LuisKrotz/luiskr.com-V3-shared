# `experiments/star-field/engine/frame/fx.ts`

Ambient-life per-frame effects — `pulse` bodies (variable

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/frame/fx.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_camScratch`

Module scratch vector — updateFx drops the camera position into each
gas plane's parent-local frame once per frame; reusing one vector
keeps the per-frame path allocation-free.

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

Streaming gas — each tail's tessellated plane is a CYLINDRICAL
BILLBOARD: it rolls about its streak axis so the broad side
faces the camera (a plane edge-on is a hairline, never a
polygonal shell), while the vertex-color envelope keeps every
quad edge at alpha 0 and the seamless filament map scrolls
`offset.x` underneath so gas visibly streams anti-sunward. The
roll solves `θ = atan2(−uy, lz)` in the tail-parent frame after
rotating the dust tilt back out — the plane's +z normal then
points at the camera; a slow wobble overlays it for turbulent
shimmer, and a detuned sine flickers opacity like plasma
gusts. The plane shadows the base tail's length each frame and
scales its width on y only (z stays 1 — it is a surface, not
a shell).

### `cam`

Camera roll — the camera position drops into each plane's
parent-local frame (+x anti-sunward), the dust tilt is rotated
back out of the offset so the roll axis is the streak's own x,
and the remaining transverse angle solves `θ = atan2(−uy, lz)`
(normal +z → (0,−sinθ,cosθ) ∥ (uy,lz)). A lazy module scratch
vector keeps this allocation-free; without a camera/parent the
planes keep their built orientation plus the wobble.
