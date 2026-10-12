# `website/components/home/mosaic/burn/front.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website/components/home/mosaic/burn/front.ts`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `edgeNoise`

Deterministic smooth edge noise — three detuned sines read as an
organic flame line rather than static noise. `ph` (seconds) animates
the jag so the burn boundary itself licks sideways as it descends.

- `@param` x Paper-space column the jag is sampled at (device px).
- `@param` ph Animation phase — the session clock in seconds.

### `letterProgress`

A letter's own burn progress — global progress scaled by the letter's
speed, shifted by its ignition delay. Letters ignite at different
moments and race at different rates, so one glyph can be ash while a
neighbour is untouched.

- `@param` L The letter's burn unit (speed multiplier + ignition delay).
- `@param` progress Global burn stage 0..1.

### `letterFrontY`

Per-column burn front inside one letter — the paper-space y of the
live edge at column x. The front climbs BOTTOM→TOP through the
letter's own ink extent (y1 → y0), so a descender's stem burns up from
the baseline, not from the paper's bottom edge.

- `@param` s The live session (its clock animates the edge noise).
- `@param` L The letter whose front is sampled.
- `@param` x Paper-space column inside the letter (device px).
- `@param` progress Global burn stage 0..1.
- `@param` jagAmp Jagged-edge amplitude in device px.
