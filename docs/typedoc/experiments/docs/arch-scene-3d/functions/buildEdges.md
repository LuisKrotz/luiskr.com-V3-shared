[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [experiments/docs/arch-scene-3d](../README.md) / buildEdges

```ts
function buildEdges(placed, positions, scale): object
```

Defined in: experiments/docs/arch-scene-3d.ts:296

Expands the parent→child edge list into cross-quad ribbon geometry
via `segmentsToRibbons` at the edge half-width.

## Parameters

### placed

readonly [`PlacedNode`](../../arch-scene/interfaces/PlacedNode.md)[]

Flattened tree.

### positions

`Float32Array`

xyz triplets per node.

### scale

`Float32Array`

## Returns

`object`

The four attribute arrays for `upload_geometry`.

### dir

```ts
dir: object
```

#### dir.pos

```ts
pos: Float32Array
```

#### dir.nrm

```ts
nrm: Float32Array
```

#### dir.uv

```ts
uv: Float32Array
```

#### dir.idx

```ts
idx: Uint32Array
```

### leaf

```ts
leaf: object
```

#### leaf.pos

```ts
pos: Float32Array
```

#### leaf.nrm

```ts
nrm: Float32Array
```

#### leaf.uv

```ts
uv: Float32Array
```

#### leaf.idx

```ts
idx: Uint32Array
```
