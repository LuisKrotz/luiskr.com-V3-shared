[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [experiments/star-field/engine/bodies/primitives](../README.md) / SF\_USER\_DETAIL\_R

```ts
const SF_USER_DETAIL_R: 'detailReveal' = 'detailReveal'
```

Defined in: experiments/star-field/engine/bodies/primitives.ts:38

`userData` key overriding a detail object's LOD reveal distance —
updateLod reads it as an absolute camera-to-anchor reach. Local-scale
detail (the LEO satellite swarm, ISS-class orbiters) must not inherit
the host's heliocentric `orbit` in the generic `PAD + size·SCALE`
reach or Earth's near-field shell would render from halfway across
the chart; these objects carry their own honest reach instead.
