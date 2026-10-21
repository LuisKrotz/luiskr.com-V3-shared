[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/weather](../README.md) / SF\_PLUME

```ts
const SF_PLUME: Readonly<{
  VENTS: 6
  HEIGHT: 1.9
  WIDTH: 0.2
  JET_BASE_W: 0.035
  JET_TOP_W: 0.24
  JET_SEG: 12
  PERIOD: 3.2
  OPACITY: 0.42
  PUFF_OPACITY: 0.55
  SUN_LO: -0.2
  SUN_HI: 0.45
  DARK_FLOOR: 0.08
  POLAR_LAT: 0.85
  POLAR_SPREAD: 0.28
}>
```

Defined in: core/tokens/starfield/params/weather.ts:334

Cryovolcanic/volcanic plume systems — Enceladus vents water-ice
geysers from its south-polar tiger stripes, Io throws sulfur plumes
hundreds of km over its whole surface. Each vent carries a steady
jet sprite plus a rising puff sprite that cycles outward, fades, and
recycles — a continuous eruption read without per-frame allocation.
