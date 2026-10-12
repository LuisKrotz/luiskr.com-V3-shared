[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/weather](../README.md) / SF\_SOLAR\_WIND

```ts
const SF_SOLAR_WIND: Readonly<{
  BASE: 0.35
  WAVE_AMP: 0.3
  WAVE_PERIOD: 41
  STORM_F1: 0.071
  STORM_F2: 0.045
  STORM_POW: 6
  STORM_GAIN: 0.9
  FLARE_N: 5
  FLARE_MIN_SCALE: 0.5
  FLARE_MAX_STRETCH: 2.1
}>
```

Defined in: core/tokens/starfield/params/weather.ts:133

Solar-wind activity cycle — one shared uniform drives the sun's flare
frequency AND every aurora shell, so a storm spike on the Sun visibly
reaches Earth/Jupiter/Saturn/Neptune a beat later. BASE+WAVE give the
slow ~11-year-style swell; the storm term multiplies two detuned sines
and takes a high power so spikes stay rare and sharp.
