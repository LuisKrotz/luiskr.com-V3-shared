# `website\components\home\mosaic\burn\particles.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\mosaic\burn\particles.ts`  |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `spawn`

Spawns particles along live letter fronts. `rate` is fractional — the
accumulator pattern (spawn whole particles, keep the remainder in
`t`-space implicitly by probabilistic gating) keeps density steady
without a second counter. Emissions come only from columns that
carry glyph ink and whose letter front is mid-flight, so embers pour
off burning edges — never out of the spaces between letters.

Burn sessions (dir +1) emit AT the front with upward velocity — the
classic rising-ember look. Rebuild sessions (dir −1) instead seed the
still-empty zone ABOVE the front and launch downward: deposits rain
top→bottom and land on the climbing edge, knitting the glyphs back.

- `@param` s The live session — pushes into s.particles.
- `@param` progress Global burn stage 0..1.
- `@param` jagAmp Jagged-edge amplitude in device px.
- `@param` dt Seconds since the last frame.

### `drawParticles`

Advances + draws particles. Burn embers flicker upward on buoyancy and
flecks tumble down; rebuild deposits (dir −1) fall under gravity from
the empty zone above each letter and die the moment they reach the
climbing front — the landing reads as the glyph re-inking itself.

- `@param` s The live session — mutates s.particles, paints on s.ctx.
- `@param` dt Seconds since the last frame.
- `@param` stage Global burn stage 0..1 (1 − prog on rebuild).
- `@param` jagAmp Jagged-edge amplitude in device px.
