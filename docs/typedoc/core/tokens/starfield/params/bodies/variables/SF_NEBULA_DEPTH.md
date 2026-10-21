[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/bodies](../README.md) / SF\_NEBULA\_DEPTH

```ts
const SF_NEBULA_DEPTH: Readonly<{
  ECHO_SCALE: 1.28
  ECHO_OPACITY: 0.22
  UNDER_SCALE: 1.9
  UNDER_OPACITY: 0.18
  SWIRL_MIN: 0.004
  SWIRL_SPREAD: 0.011
  ECHO_RATE: -1.7
  UNDER_RATE: 0.35
  OP_WAVE: 0.18
  OP_FREQ: 0.31
  BREATHE_AMP: 0.03
  BREATHE_FREQ: 0.09
}>
```

Defined in: core/tokens/starfield/params/bodies.ts:570

Nebula depth layering — a parallax echo + wide underlay glow composed
under the photo sprite so a nebula reads as a volume of gas at
different depths instead of one flat billboard. The *_RATE/_FREQ/_WAVE
members drive the ambient-life pass in updateFx: each layer swirls
(SpriteMaterial.rotation is a UV-space turn, so the feathered photo
churns in place rather than orbiting) and breathes opacity on detuned
sines; rates are seeded from the body id so no two nebulae churn alike.
