[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/frame](../README.md) / anchorWorldPos

```ts
function anchorWorldPos(anchor): object;
```

Defined in: experiments/star-field/engine/frame.ts:99

World position of an anchor — single getWorldPosition call-site so the
armed Vector3 stays private to this module; returns {x,y,z} so callers
never handle three types.

## Parameters

### anchor

Any Object3D in the scene graph.

#### getWorldPosition?

(`v`) => `object`

## Returns

`object`

### x

```ts
x: number;
```

### y

```ts
y: number;
```

### z

```ts
z: number;
```
