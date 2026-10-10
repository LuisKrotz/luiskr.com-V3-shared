# `experiments/star-field/engine/bodies/deep-sky.ts`

Real-imagery surface for deep-sky bodies — nebulae, star

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bodies/deep-sky.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Texture source map shared with bootstrap (URL → loaded texture).

### `makeNebulaSprite`

Billboard sprite for nebulae and star clusters — the real photo on a
camera-facing sprite with feathered edges and source aspect ratio
preserved. Additive blending + tint only on the procedural fallback,
where the glow texture stands in for imagery.
- `@param` THREE The three.js module.
- `@param` def Catalog entry (texture = photo URL, color = fallback tint).
- `@param` texMap Loaded texture map keyed by URL.
- `@param` glowTex Shared radial-gradient glow texture (may be undefined).

### `makeGalaxyDisc`

Tilted photographic disc for an external galaxy — the real image on a
plane lying in the body's disc plane, edge-feathered so it melts into
the skybox. The group's tilt (`def.tilt`) still applies; the spin
field rotates the photo in-plane, reading as the galaxy's true
rotation. Non-photo defs keep the soft glow disc.
- `@param` THREE The three.js module.
- `@param` def Catalog galaxy entry.
- `@param` texMap Loaded texture map keyed by URL.
- `@param` glowTex Shared radial-gradient glow texture (may be undefined).
- `@param` localTilt Extra tilt in radians — callers whose parent group
