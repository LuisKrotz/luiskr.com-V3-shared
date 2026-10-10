# `experiments/star-field/engine/bodies/structures.ts`

Cosmic-hierarchy bodies — boundary spheres + member

| | |
|---|---|
| **Source** | `src/experiments/star-field/engine/bodies/structures.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `makeSpeckles`

Member-galaxy speckle cloud — seeded uniform-sphere scatter inside
`SPECKLE_FILL` of the shell radius so members keep off the boundary
skin. Brightness jitters per point so the cloud reads as a galaxy
field rather than noise static; additive tiny points, never pickable.
- `@param` THREE The three.js module.
- `@param` def Catalog entry (id seeds the scatter).
- `@param` radius Speckle volume radius in chart units.
- `@param` count Speckle count.

### `makeShellMaterial`

Fresnel-rim boundary shell — a node material whose emission peaks
where the surface grazes the view ray (the bubble silhouette) and
falls to zero face-on, so the shell never paints a flat filled disc
over the sky. The node graph is the TSL translation of the original
GLSL rim shader — the WebGPURenderer pipeline rejects classic
ShaderMaterials. Output is premultiplied (`color·opacity·rim`) so
additive blending adds exactly the rim glow.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors (bootstrap-injected).
- `@param` def Catalog entry — `def.color` tints the bubble.

### `makeStructure`

Builds one hierarchy structure: a low-poly fresnel-rim boundary
sphere plus the optional interior speckle volume. The rim material
makes the shell read as a soap bubble — only the silhouette glows,
face-on area adds nothing — so nested shells can never stack into
a flat film over the sky (the BackSide wash bug), and the boundary
blends into the black instead of cutting a hard disc. Every child's
raycast is stubbed so the shell can never eat a pointer hit meant
for bodies inside it.
- `@param` THREE The three.js module.
- `@param` deps TSL namespace + node-material ctors (bootstrap-injected).
- `@param` def Catalog entry — `structure.radius` sets the shell size.
- `@param` glowTex Unused (kept for maker-signature symmetry).
- `@returns` The structure group.
