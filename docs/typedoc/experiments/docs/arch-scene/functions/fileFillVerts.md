[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene](../README.md) / fileFillVerts

```ts
function fileFillVerts(): Float32Array
```

Defined in: experiments/docs/arch-scene.ts:658

Filled document glyph — the folded-corner page as a thin extruded
pentagon prism (the cut corner reads as the fold; the card thickness
keeps the solid visible through the edge-on part of its yaw). Scaled
to SCENE_FILE_RADIUS·1.3 so leaf glyphs read smaller than folders
(the container/item size ratio of the reference). Exported: the
scene3d arm uploads the same soup.

## Returns

`Float32Array`

Flat xyz triplets — triangle soup, every 9 floats one tri.
