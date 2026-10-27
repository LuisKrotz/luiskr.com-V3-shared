[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene-3d](../README.md) / segmentsToRibbons

```ts
function segmentsToRibbons(segs, half): object
```

Defined in: experiments/docs/arch-scene-3d.ts:165

Expands a raw segment list into cross-quad ribbon geometry — two
perpendicular quads per segment (the engine draws triangles only;
a crossed pair reads as a 1px line strip from every angle). SoA
upload: positions + zero normals (basic material is unlit) + zero
uvs + triangle indices. Used by the edge fan; the filled glyphs
upload through `trisToGeometry` instead.

## Parameters

### segs

`ArrayLike`\<`number`\>

Flat xyz pairs — every six floats are one segment.

### half

`number`

Ribbon half-width in chart units.

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
