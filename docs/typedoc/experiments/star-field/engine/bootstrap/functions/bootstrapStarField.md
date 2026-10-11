[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [experiments/star-field/engine/bootstrap](../README.md) / bootstrapStarField

```ts
function bootstrapStarField(s): Promise<void>;
```

Defined in: experiments/star-field/engine/bootstrap.ts:110

Bootstraps the star-field engine — full sequence: three import →
renderer probe → scene/camera/controls → texture parallel load →
body graph → picking → resize → shader warmup → first frame → ready.
Silent bailouts (webglAllowed, probe failure, dispose mid-boot) leave
`s.failed`/partial state for init() to flag.

## Parameters

### s

[`SFState`](../../types/interfaces/SFState.md)

Engine state.

## Returns

`Promise`\<`void`\>
