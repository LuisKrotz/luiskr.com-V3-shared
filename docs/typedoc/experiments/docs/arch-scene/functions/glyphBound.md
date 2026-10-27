[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / glyphBound

```ts
function glyphBound(verts): number
```

Defined in: experiments/docs/arch-scene.ts:779

Bounding radius of a glyph vert list — the invisible pick-sphere
radius (instanced BufferGeometry isn't on three's raycast path, so
picking runs against instanced spheres sized to the glyph's exact
bound) and the radius edges clip against. Exported: the scene3d arm
sizes its JS-side pick spheres from the same bound.

## Parameters

### verts

`Float32Array`

Flat xyz triplets (segment list or triangle soup).

## Returns

`number`
