[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/earth-playground/earth/consts](../README.md) / SEG\_HIGH

```ts
const SEG_HIGH: 128 = 128;
```

Defined in: experiments/earth-playground/earth/consts.ts:30

Sphere tessellation: 128×128 segments ≈ 32k triangles per shell. Chosen so
the silhouette stays smooth when the camera zooms to 1.2× radius — below
~64 segments the limb shows polygon edges.
