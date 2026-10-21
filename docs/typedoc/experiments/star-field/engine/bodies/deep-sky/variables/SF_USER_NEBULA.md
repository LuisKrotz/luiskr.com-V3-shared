[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/deep-sky](../README.md) / SF\_USER\_NEBULA

```ts
const SF_USER_NEBULA: 'nebulaFx' = 'nebulaFx'
```

Defined in: experiments/star-field/engine/bodies/deep-sky.ts:33

userData key under which `makeNebulaSprite` parks the animation
record (`SFNebulaFx`) — bodies-scene lifts it onto the node so
`updateFx` can swirl/breathe the layers without the sprite factory
changing its return contract.
