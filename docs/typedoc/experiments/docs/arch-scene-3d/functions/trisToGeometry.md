[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene-3d](../README.md) / trisToGeometry

```ts
function trisToGeometry(tris): object
```

Defined in: experiments/docs/arch-scene-3d.ts:273

Packages a glyph triangle soup into the engine's SoA geometry
payload — sequential indices over the unindexed soup, zero normals
(the basic material is unlit) and zero uvs. Mirrors
`segmentsToRibbons`'s return shape so both upload identically.

## Parameters

### tris

`Float32Array`

Flat xyz triplets — every 9 floats one triangle.

## Returns

`object`

The four attribute arrays for `upload_geometry`.

### pos

```ts
pos: Float32Array
```

### nrm

```ts
nrm: Float32Array
```

### uv

```ts
uv: Float32Array
```

### idx

```ts
idx: Uint32Array
```
