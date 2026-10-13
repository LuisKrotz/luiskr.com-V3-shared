# `experiments/star-field/engine/bodies/plumes.ts`

Cryovolcanic and volcanic plume systems — the moving

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/plumes.ts`    |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Sprite record the caller lifts onto `node.plumes` for updateFx.

### `makePlumes`

Builds the plume group for a `def.plumes` body: per-vent jet + puff
sprites under one group the caller parents to the body mesh (jets
inherit surface spin, so vents stay fixed over their terrain scars —
Enceladus' geysers track the tiger stripes as the moon rotates).

- `@param` THREE The three.js module.
- `@param` def Catalog entry — `plumes` config + radius scale the vents.
- `@param` glowTex Shared radial-glow texture for the sprites.
- `@returns` `{ group, vents }` — null without a glow texture.
