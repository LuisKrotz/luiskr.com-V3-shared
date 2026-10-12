[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/weather](../README.md) / SF\_WEATHER

```ts
const SF_WEATHER: Readonly<{
  CLOUD_FREQ: 2.8
  CLOUD_DETAIL_FREQ: 4.3
  CLOUD_DETAIL_GAIN: 0.4
  CLOUD_EVOLVE: 0.012
  CLOUD_STEER: 0.55
  COVER_LO: 0.3
  COVER_HI: 0.58
  JET_BASE: 0.016
  JET_LAT: 0.02
  LAT_MEANDER: 0.16
  ITCZ_HALF: 0.14
  ITCZ_GAIN: 0.75
  ITCZ_WANDER: 0.3
  ITCZ_CELL_LO: 0.42
  ITCZ_CELL_HI: 0.72
  DENS_POW: 1.6
  STORM_N: 4
  STORM_R: 0.22
  STORM_GAIN: 1.1
  STORM_SWIRL: 2.6
  STORM_DRIFT: 0.006
  STORM_FREQ: 9
  EYE_R: 0.05
  EYE_DIP: 0.9
  ICE_BASE: 0.82
  ICE_DECL: 0.1
  ICE_S_BASE: 0.9
  ICE_S_DECL: 0.05
  ICE_SOFT: 0.06
  SNOW_GAIN: 0.45
  VOLC_R: 0.12
  VOLC_GAIN: 0.8
  VOLC_PERIOD: 73
  ASH_TINT: 4867136
  SHADOW: 0.32
}>
```

Defined in: core/tokens/starfield/params/weather.ts:16

Procedural weather field — Earth-grade cloud/climate constants.
Angles are radians, times are scene seconds (`s.t`), densities are
0..1 coverages blended into the cloud deck's alpha.
