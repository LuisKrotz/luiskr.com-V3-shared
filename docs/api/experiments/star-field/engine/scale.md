# `experiments/star-field/engine/scale.ts`

Multi-tier astronomical scale model for the star-field

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/scale.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `sfChartDist`

Piecewise distance → chart-units compression shared by the authored
catalog, the deep-field point cloud and the registry fly-to math.
Continuous at each break so close objects keep honest ratios: a body
twice as far always lands twice as far within a tier, and the tier
boundaries join smoothly (1 Mly → 10 000 units from either side).
- `@param` ly Heliocentric distance in light-years.
- `@returns` Compressed chart radius in scene units.

### `sfGalacticPos`

Galactic-coordinate → chart-position conversion. Real galactic
coordinates are heliocentric: `l` longitude measured from the galactic
centre direction, `b` latitude above the plane, `d` distance in
light-years. The standard galactic frame (x toward l=0°, y toward
l=90°, z toward the north galactic pole) is right-handed; the chart
maps it to (-x, z, y) so the galactic centre lands at −X (matching the
Milky Way disc's offset centre) while staying right-handed.

The same rotation.x the deep-field cloud applies (`-π/2 + tilt`) then
leans the whole galactic frame onto the rendered disc tilt, so every
authored body shares the plane the particle spiral draws.
- `@param` lDeg Galactic longitude in degrees.
- `@param` bDeg Galactic latitude in degrees.
- `@param` distLy Heliocentric distance in light-years.
- `@param` tilt Milky Way disc tilt in radians (the catalog `tilt` field).
- `@returns` `[x, y, z]` world position in chart units.

### `sfGalacticVec`

Cartesian galactic → chart-position conversion — the shared back end
of `sfGalacticPos` used directly by the deep-field cloud and registry
fly-to, whose records already carry heliocentric galactic xyz. The
standard galactic frame (x toward l=0°, y toward l=90°, z toward the
north galactic pole) maps to (−x, z, y): chart X = −x_gal puts the
galactic centre at −X where the Milky Way disc sits, Y = z_gal raises
the north galactic pole, Z = y_gal keeps the frame right-handed. The
same `rotation.x = −π/2 + tilt` the cloud applies then leans the
whole galactic frame onto the rendered disc tilt.
- `@param` xGal Heliocentric x_gal in light-years (toward l=0°).
- `@param` yGal Heliocentric y_gal in light-years (toward l=90°).
- `@param` zGal Heliocentric z_gal in light-years (toward NGP).
- `@param` tilt Milky Way disc tilt in radians (the catalog `tilt` field).
- `@returns` `[x, y, z]` world position in chart units.
