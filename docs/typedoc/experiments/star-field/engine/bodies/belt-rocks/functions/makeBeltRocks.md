[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/belt-rocks](../README.md) / makeBeltRocks

```ts
function makeBeltRocks(THREE, def): object
```

Defined in: experiments/star-field/engine/bodies/belt-rocks.ts:318

Populates an asteroid-belt definition with hero rock meshes — the
particle annulus stays as the mass background, these give the belt
its readable "rocks drifting past" foreground on fly-in.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

The belt's catalog entry — `def.belt` sizes the annulus.

## Returns

`object`

`group` of rock pivots + `pivots` satPivots entries.

### group

```ts
group: Object3D
```

### pivots

```ts
pivots: object[];
```
