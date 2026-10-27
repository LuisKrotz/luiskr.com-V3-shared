[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / dirFillVerts

```ts
function dirFillVerts(): Float32Array
```

Defined in: experiments/docs/arch-scene.ts:622

Filled folder glyph — the classic filled-icon silhouette (rect body

- tab bump) as a thin extruded card, so the tab reads IN the outline
  from front, back and glancing angles. The silhouette is non-convex
  at the tab foot, so the faces split on the shelf: body quad + tab
  quad, no fan. Pure vertex math — no textures, no imported geometry.
  Exported: the scene3d arm uploads the same soup.

## Returns

`Float32Array`

Flat xyz triplets — triangle soup, every 9 floats one tri.
