[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / irregularGeometry

```ts
function irregularGeometry(THREE, def): BufferGeometry
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:134

Triaxial rubble-pile geometry for `def.irregular` bodies — a detail-7
icosahedron crumpled by two octaves of seeded value noise so the
silhouette dimples like a captured asteroid instead of reading as a
hydrostatic ball. Every vertex sits on the sphere (r = def.radius);
the macro displacement `vnoise(unit)·amp` pushes it along its own
normal, then a fine octave at `ROCK_FINE_FREQ ×` adds regolith-scale
grain so the shading never reads as one smooth lump,
then `axes` stretches the solid into the body's true triaxial
proportions (Phobos ≈ 27×22×18 km → [1, 0.81, 0.67]). Per-vertex
spherical UVs (u = atan2 longitude, v = asin latitude) are baked
from the PRE-stretch unit direction so an equirect map still wraps
pole-to-pole without smearing across the crumpled facets.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry — `irregular` carries amp + optional axes.

## Returns

`BufferGeometry`

Crumpled geometry with spherical UVs + smooth normals.
