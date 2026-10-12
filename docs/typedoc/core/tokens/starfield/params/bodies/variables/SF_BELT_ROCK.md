[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/bodies](../README.md) / SF\_BELT\_ROCK

```ts
const SF_BELT_ROCK: Readonly<{
  COUNT: 40
  SIZE_MIN: 0.005
  SIZE_MAX: 0.02
  BIG_FRAC: 0.12
  BIG_MAX: 0.05
  FRAGMENT_FRAC: 0.25
  JITTER: 0.55
  JITTER_FRAG: 0.8
  CLASS_STONE: 0.34
  CLASS_CARBON: 0.2
  CLASS_DUST: 0.16
  CLASS_ICE: 0.16
  ORBIT_SPEED: 0.16
  SPIN_MIN: 0.05
  SPIN_SPAN: 0.4
}>
```

Defined in: core/tokens/starfield/params/bodies.ts:124

Belt hero rocks — seeded irregular meshes riding each belt so the
annulus reads as real varied debris (ice, metal, carbon, stone, dust;
fragments through large bodies) instead of uniform glowing points.
Sizes are fractions of the annulus width; every rock owns a Keplerian
pivot (`speed ∝ 1/√r`) plus a tumble rate, both riding the shared
satPivots update.
