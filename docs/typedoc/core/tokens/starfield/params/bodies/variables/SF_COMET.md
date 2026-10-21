[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/bodies](../README.md) / SF\_COMET

```ts
const SF_COMET: Readonly<{
  COMA_SCALE: 9
  COMA_OPACITY: 0.45
  COMA_FLOOR: 0.25
  ION_LEN: 32
  ION_OPACITY: 0.55
  DUST_LEN: 21
  DUST_TILT: 0.24
  DUST_OPACITY: 0.42
  ACTIVE_FRAC: 0.3
  GAMMA: 1.5
  TAIL_OFF: 0.02
  PTS_CORE: 240
  PTS_HALO: 280
  PSZ_CORE: 1.25
  PSZ_HALO: 3
  DUST_PSIZE: 1.15
  SPREAD_ION: 1.05
  GROW_ION: 3.6
  SPREAD_DUST: 1.9
  GROW_DUST: 7
  WID_FLOOR: 0.4
  SHEATH_W: 1.7
  OP_HALO: 0.42
  HALO_SLOW: 0.7
  RATE_ION_LO: 0.05
  RATE_ION_HI: 0.2
  RATE_DUST_LO: 0.015
  RATE_DUST_HI: 0.07
  DIM_LO: 0.4
  WOB_AMP: 0.55
  WOBF_LO: 0.3
  WOBF_HI: 1.7
  SZ_LO: 0.6
  SZ_BASE: 0.55
  SZ_GROW: 1.4
  PTS_RAMP: 0.06
  PTS_FADE: 1.15
  ZFLAT: 0.65
  GAIN: 1.15
  WIND_K: 0.3
}>
```

Defined in: core/tokens/starfield/params/bodies.ts:257

Comet rendering — a `SF_KINDS.COMET` body is a dark irregular nucleus
wrapped in a sublimated gas/dust envelope (coma) trailing two tails.
The ion tail is a long narrow streak pointing straight anti-sunward
(the solar wind entrains plasma along field lines); the dust tail is
shorter, wider and lags the radius vector because grains keep some
orbital momentum — it tilts off the anti-sunward line and fans out.
Both tails are PARTICLE STREAMS rooted at the nucleus — `THREE.Points`
clouds of soft-glow grains, never quads — whose length and opacity
scale with heliocentric proximity: sublimation scales steeply with
solar flux, so the tail ignites at periapsis and dies on the outbound
leg. Lengths are multiples of the nucleus radius (Halley ≈ 0.2 units
→ ~6.4-unit ion stream), so the proportions read correctly at chart
scale where an honest ~10⁸-km tail would cross the whole map.
