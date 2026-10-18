# `experiments/star-field/engine/bodies/belt-rocks.ts`

Hero asteroids for the two belts — COUNT individual

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| **Source**     | `src/experiments/star-field/engine/bodies/belt-rocks.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.  |

## Members

### (module scope)

Material class descriptor — palette source + paint recipe + PBR
tuning for one family of belt rock.

### `key`

Seed/texture key.

### `color`

Packed hex base color the texture derives its shades from.

### `p`

Pick probability (the five must sum to 1).

### `roughness`

Material roughness — metal reads glossier than regolith.

### `metalness`

Material metalness — only the `metal` class is truly metallic.

### `_CLASSES`

The five belt material classes, mirroring real asteroid taxonomy —
stony chondrites dominate, carbonaceous next, dust/ice/metal trail.

### `rockTexture`

Paints one material-class texture: base fill + per-class features —
crater pits for stone, specular veins for metal, fracture streaks
for ice, nothing but grain for carbon/dust.

- `@param` THREE The three.js module.
- `@param` cls Material class descriptor.
- `@param` rand Seeded RNG.
- `@returns` CanvasTexture or undefined when 2d is unavailable.

### `rockGeometry`

Builds one unique rock geometry — either a crumpled icosahedron
(irregular body) or a sheared tetrahedron (collision fragment).
Vertices are displaced radially by seeded value noise, then per-
vertex spherical UVs (u = atan2 longitude, v = asin latitude) are
baked so the class texture wraps the body like a moon map.

- `@param` THREE The three.js module.
- `@param` frag True → tetrahedral fragment shape.
- `@param` rand Seeded RNG for this individual rock.

### `pickClass`

Picks a material class for one rock from the cumulative probability
table (metal holds the implicit remainder of the four named classes).

- `@param` rand Seeded RNG.

### `makeBeltRocks`

Populates an asteroid-belt definition with hero rock meshes — the
particle annulus stays as the mass background, these give the belt
its readable "rocks drifting past" foreground on fly-in.

- `@param` THREE The three.js module.
- `@param` def The belt's catalog entry — `def.belt` sizes the annulus.
- `@returns` `group` of rock pivots + `pivots` satPivots entries.
