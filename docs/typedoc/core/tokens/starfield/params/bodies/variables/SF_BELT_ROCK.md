[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/bodies](../README.md) / SF\_BELT\_ROCK

```ts
const SF_BELT_ROCK: Readonly<{
  COUNT: 48
  DETAIL: 24
  FRAG_DETAIL: 10
  MID_FREQ: 2.6
  MID_AMP: 0.32
  FINE_FREQ: 6
  FINE_AMP: 0.22
  TEX_W: 512
  TEX_H: 256
  TEX_GRAIN: 380
  TEX_CRATERS: 52
  TEX_VEINS: 22
  TEX_STREAKS: 16
  SIZE_MIN: 0.0025
  SIZE_MAX: 0.008
  BIG_FRAC: 0.12
  BIG_MAX: 0.015
  FRAGMENT_FRAC: 0.25
  JITTER: 0.55
  JITTER_FRAG: 0.8
  CLASS_STONE: 0.3
  CLASS_CARBON: 0.18
  CLASS_HYDRO: 0.1
  CLASS_DUST: 0.13
  CLASS_ICE: 0.13
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
