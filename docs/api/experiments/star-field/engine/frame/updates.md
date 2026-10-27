# `experiments\star-field\engine\frame\updates.ts`

Per-frame scene updates driven by `tickFrame` — approach

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\frame\updates.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `checkApproach`

Proximity check — when the camera comes within a body's approach
distance its dossier JSON prefetches via `onApproach`, once per body
per session (the `approached` set). Selection prefetches too, so a
slow drift-through and a direct nav click share one cache.

- `@param` s Engine state.

### `updateLod`

Detail level-of-detail — toggles each node's secondary geometry
(shells, satellite pivots, the near-field star group) by camera
distance so remote bodies draw as one primitive. Orbit radius counts
toward `size` so a body's ring stays visible while the camera is
still inside it. Galactic stars carry a `farGlyph` point glow that
swaps with the near-field group — point glyph at chart distances,
real photosphere on approach — the mirror of the solar collapse.

- `@param` s Engine state.

### `updateStructures`

Cosmic-hierarchy shell fade — hides the inside of every boundary bubble
while the camera is deep within it. A huge fresnel shell viewed from
the interior paints a bright silhouette over the whole sky (the giant
cream-ball bug), so each structure's shell ramps to visible only once
the camera has pulled back to 1.25–1.7× its radius.

- `@param` s Engine state.

### `updateGalaxyClouds`

Volumetric galaxy cloud fade — the Milky Way's particle disc is
viewed from inside. Without distance attenuation the hundreds of
thousands of additive points stack into an opaque glowing ball that
swallows the view; fade them down while the camera is embedded, and
ramp up as the camera pulls back far enough to read the disc as a
whole. Only volumetric clouds carry the marker.

- `@param` s Engine state.

### `updateStarCloud`

Deep-field cloud camera fade — the real catalogue surrounds the Sun
isotropically, so pulled far enough back it reads as a solid glowing
sphere regardless of the per-star edge fade. While the camera is
embedded the full density is correct (the local stellar neighborhood
IS a volume); once outside, the cloud rolls down to a faint floor so
it dissolves into the Milky Way disc instead of painting a ball.

- `@param` s Engine state.

### `trackHover`

Hover tracking — re-projects the hovered anchor each tick and reports
canvas-space pixels so the DOM tooltip + leader line track orbiting
bodies. The navigator-hover hint takes precedence over the raycast
hover (the pointer is on the drawer) and resolves its stored anchor
or shard record into a live world point, then an edge-clamped screen
point that locates the body at any zoom level.
Fires nothing when hover is idle (no per-frame DOM churn).

- `@param` s Engine state.

### `updateDayNight`

Day/night uniform feed — for every body whose shading depends on the
sun direction (night-lights emissive gating, atmosphere rim shells)
writes `dir = normalize(sunPos − bodyPos)` into the shared vector the
material's TSL uniform wraps. `anchorWorldPos`'s shared scratch is
copied before the loop so the sun position survives each resolution.

- `@param` s Engine state.

### `smoothstep`

Local smoothstep helper — mirrors GLSL, no dependency on three.js.
