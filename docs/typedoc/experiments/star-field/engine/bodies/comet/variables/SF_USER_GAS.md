[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/comet](../README.md) / SF\_USER\_GAS

```ts
const SF_USER_GAS: 'gasPts' = 'gasPts'
```

Defined in: experiments/star-field/engine/bodies/comet.ts:54

userData key each tail `InstancedMesh` node uses to stash its particle
simulation record: the live position/color `Float32Array`s, the
instance-buffer handles (`aMat` = `instanceMatrix`, `aCol` =
`instanceColor` — so updateFx can flag `needsUpdate`), the seeded
per-grain vectors (emission phase, lateral offset, stream rate,
wobble, size jitter), and the layer's base dimensions (tail length,
root spread, fan growth, grain size, tint, opacity). Storing the
arrays here — rather than reading them back out of buffers — keeps
the frame loop allocation-free AND makes the record inspectable
without a live three.js renderer.
