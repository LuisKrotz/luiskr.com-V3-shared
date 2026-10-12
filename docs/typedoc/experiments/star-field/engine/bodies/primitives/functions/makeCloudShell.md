[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / makeCloudShell

```ts
function makeCloudShell(THREE, def, cloudTex): Object3D
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:227

Extra translucent sphere one shell above a surface — Earth's cloud
deck rides a white-on-black map under additive blending so the dark
sky between clouds contributes nothing; the deck scales slightly past
the surface sphere so it reads as atmosphere, not paint.

## Parameters

### THREE

`__module`

The three.js module.

### def

[`SFBodyDef`](../../../types/interfaces/SFBodyDef.md)

Catalog entry (radius sizes the shell).

### cloudTex

`Texture`

The loaded cloud map (caller guards its presence).

## Returns

`Object3D`
