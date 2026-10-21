[**luiskr.com**](../../../../../../../README.md)

---

[luiskr.com](../../../../../../../README.md) / [experiments/star-field/engine/bodies/procedural/shared](../README.md) / weldGeometry

```ts
function weldGeometry(THREE, geo): BufferGeometry
```

Defined in: experiments/star-field/engine/bodies/procedural/shared.ts:159

Welds a subdivided primitive's duplicated vertices into an INDEXED
geometry — `IcosahedronGeometry`/`TetrahedronGeometry` emit every
face's corners as independent vertices, so `computeVertexNormals`
on the raw mesh produces PER-FACE normals: each triangle shades
flat, which is exactly the crystalline "warty" facet look asteroids
must not have. Welded vertices share one normal, so the displaced
surface shades smooth (bumpy but continuous, like real rubble) —
and vertex count drops ~85% (a detail-6 icosahedron's 246k verts
become ~41k), cutting VRAM the same amount.

Vertex identity keys on the rounded position — subdivision vertices
are bit-identical across faces, so a fixed-precision string dedups
them deterministically. Callers displace the WELDED positions (one
vertex = one noise evaluation) and bake UVs/normals afterwards.

## Parameters

### THREE

`__module`

The three.js module.

### geo

`BufferGeometry`

Subdivided source geometry with a `position` attribute.

## Returns

`BufferGeometry`

Indexed geometry with a single welded position attribute.
