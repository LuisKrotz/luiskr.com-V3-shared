[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene-3d](../README.md) / buildEdges

```ts
function buildEdges(placed, positions): object
```

Defined in: experiments/docs/arch-scene-3d.ts:139

Expands the parent→child edge list into cross-quad ribbon geometry —
two perpendicular quads per edge (the engine draws triangles only;
a crossed pair reads as a 1px line strip from every angle). SoA
upload: positions + zero normals (basic material is unlit) + zero
uvs + triangle indices.

## Parameters

### placed

readonly [`PlacedNode`](../../arch-scene/interfaces/PlacedNode.md)[]

Flattened tree.

### positions

`Float32Array`

xyz triplets per node.

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
