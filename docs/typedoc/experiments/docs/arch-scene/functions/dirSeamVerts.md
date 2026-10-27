[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / dirSeamVerts

```ts
function dirSeamVerts(): Float32Array
```

Defined in: experiments/docs/arch-scene.ts:715

Folder seam segments — the detail strokes a filled icon pack prints
on the card: the silhouette outline on both faces, rim struts, and
the shelf line that splits flap from body. Face details ride
SCENE_SEAM_LIFT·t proud of the panel so they never z-fight the fill.

## Returns

`Float32Array`

Flat xyz pairs — segment list for the seam LineSegments.
