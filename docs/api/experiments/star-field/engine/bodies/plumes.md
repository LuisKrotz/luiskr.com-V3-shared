# `experiments\star-field\engine\bodies\plumes.ts`

Cryovolcanic and volcanic plume systems — the moving

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments\star-field\engine\bodies\plumes.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Sprite record the caller lifts onto `node.plumes` for updateFx.

### `JET_W`

Jet-gradient canvas — tall narrow strip, alpha runs vertically.

### `jetFor`

Paints the shared jet-column texture: a vertical alpha ramp blazing
at the vent (the cylinder's bottom edge samples the canvas bottom —
CylinderGeometry maps v=0 to the base) that dissolves through the
umbrella into nothing at the rim, with a horizontal cosine roll-off
softening the silhouette edges. White-only — the material `color`
supplies the ice/sulfur tint so one texture serves every vent.

- `@param` THREE The three.js module.
- `@returns` A CanvasTexture, or undefined without a 2d context.

### `makePlumes`

Builds the plume group for a `def.plumes` body: per-vent jet + puff
sprites under one group the caller parents to the body mesh (jets
inherit surface spin, so vents stay fixed over their terrain scars —
Enceladus' geysers track the tiger stripes as the moon rotates).

- `@param` THREE The three.js module.
- `@param` def Catalog entry — `plumes` config + radius scale the vents.
- `@param` glowTex Shared radial-glow texture for the sprites.
- `@returns` `{ group, vents }` — null without a glow texture.
