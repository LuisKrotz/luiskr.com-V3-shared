# `experiments/star-field/engine/registry-body.ts`

Lazy registry-body spawner — the 139,563-record deep

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/registry-body.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `_SPECTRAL_TINT`

Spectral-class → palette tint — the HYG `s` field leads with the
Harvard letter (O B A F G K M); a record with no usable class falls
back to the white mid-ramp. Colors come from the shared B-V ramp
tokens so the spawned star matches the cloud's own color grading.

### `_EXO_TINTS`

Exoplanet palettes — seeded pick between a rocky tint and a
gas-giant tint; members come from the authored exoplanet palette so
spawned worlds sit in the same color space as the catalog's own
TRAPPIST/Kepler planets.

### `_DSO_TINTS`

OpenNGC type-code → tint. `t` carries the catalogue's short type
string (G/Gx galaxies, OC/** clusters, PN/RN nebulae, SNR remnants);
unmapped codes keep the cloud's own DSO point tint so a spawned
object matches the point it replaces.

### `starTint`

Resolves the spectral tint for a star record — first letter of the
Harvard class (`s` = "G2V" → G) through the shared ramp.

- `@param` rec Registry record.

### `dsoTint`

Resolves the DSO tint by scanning the record's OpenNGC type code
against the ordered match table (first hit wins — SNR before G so a
remnant never reads as a galaxy).

- `@param` rec Registry record.

### `starRadius`

Magnitude → chart radius for a spawned star — real discs scale with
luminosity, so a Sirius-class record (mag −1) draws the largest disc
the clamps allow while a mag-9 dwarf stays a hard point with a halo.

- `@param` m Apparent magnitude (null/absent → mid-curve).

### `buildStar`

Registry star — a fresnel-limb photosphere sphere (same shader the
authored stars use) tinted by spectral class with a seeded
granulation surface texture, plus the additive halo sprite so the
selected star reads as a point source at cloud range.

- `@param` THREE The three.js module.
- `@param` s Engine state (deps + glowTex).
- `@param` rec The registry record.

### `buildExoplanet`

Registry exoplanet — a lit sphere whose surface is the shared seeded
procedural texture (mottle/bands/streaks keyed on the record id), so
each of the 5,974 catalogued worlds gets its own terrain instead of
the same painted ball. Tint picks seeded from the exoplanet palette.

- `@param` THREE The three.js module.
- `@param` rec The registry record.

### `buildDso`

Registry deep-sky object — a seeded elliptical speckle cloud (the
same `fillElliptical` the authored dwarf galaxies use, so a catalog
galaxy/cluster resolves as a resolved member swarm, not a billboard)
plus an additive halo sprite tinted by the OpenNGC type code.

- `@param` THREE The three.js module.
- `@param` s Engine state (glowTex).
- `@param` rec The registry record.

### `disposeRegistryTree`

Disposes every geometry/material/owned texture under a spawned
registry group — canvas-generated textures (procedural surfaces) are
theirs to release; the shared `glowTex` sprite is excluded so
eviction never corrupts the scene's shared sprite.

- `@param` s Engine state (shared glowTex to exclude).
- `@param` root The spawned group to strip.

### `ensureRegistryBody`

Materializes the rendered body for a catalog record at its true
heliocentric chart position — the object the cloud point stands in
for. LRU-cached on `s.registryBodies`; a cache overflow evicts and
disposes the oldest spawn so mesh count stays bounded. No-ops on
missing THREE/deps (pre-boot), missing Sun pivot, or dispose.

- `@param` s Engine state.
- `@param` rec The resolved registry record.

### `disposeRegistryBodies`

Strips every spawned registry body — engine teardown and any
context-loss path call this so the LRU set can't leak GPU buffers.

- `@param` s Engine state.
