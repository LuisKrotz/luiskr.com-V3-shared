[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/bodies](../README.md) / SF\_DETAIL

```ts
const SF_DETAIL: Readonly<{
  MASK_PX: 1024
  MASK_INNER: 0.38
  MASK_LOBE_DIST: 0.3
  MASK_LOBE_DIST_VAR: 0.55
  MASK_LOBE_R: 0.35
  MASK_LOBE_R_VAR: 0.35
  MASK_LOBE_ALPHA: 0.55
  MASK_LOBE_ALPHA_VAR: 0.35
  MASK_LOBE_ALPHA_MAX: 1
  RING_V: 0.5
  RING_INNER: 1.24
  RING_OUTER: 2.28
  RING_STRIP_W: 512
  RING_STRIP_H: 16
  RING_BANDS: 7
  RING_BAND_W: 0.012
  RING_ALPHA_MIN: 0.04
  RING_ALPHA_MAX: 0.5
  HALO_SCALE: 3.6
  CORONA_SCALE: 2.2
  HALO_OPACITY: 0.55
  POINT_RADIUS: 0.003
  STAR_RIM_FALLOFF: 2.2
  SAT_RIM_FALLOFF: 1.5
  CLOUD_SCALE: 1.018
  CLOUD_OPACITY: 0.55
  EMISSIVE_INT: 0.9
  NIGHT_LO: -0.04
  NIGHT_HI: 0.34
  ATMO_SCALE: 1.04
  ATMO_POW: 2.6
  ATMO_ALPHA: 0.75
  ATMO_DAY_LO: -0.08
  ATMO_DAY_HI: 0.45
  ATMO_DUSK_LO: -0.28
  ATMO_DUSK_MID: -0.04
  ATMO_DUSK_HI: 0.3
  BUMP_SCALE: 0.05
  SPARKLE_FRAC: 0.05
  SPARKLE_PX: 2.4
  PICK_MIN: 2
  PICK_PROXY: 4
  GALAXY_DISC: 2.2
}>
```

Defined in: core/tokens/starfield/params/bodies.ts:397

Photographic-surface tuning — the real-imagery rendering layer for
planets and deep-sky objects. Photo masks feather a source image's
rectangular edge into transparency so NASA/ESA stills composite into
the black scene; `MASK_PX` caps the composite canvas (source images
run 1–6k px but are viewed at tens of screen px). Ring UVs are
remapped radially (`RING_V` samples the strip's center row) because
RingGeometry ships planar UVs but the Saturn strip is radius-indexed.
`HALO_SCALE` sizes the additive star-glow sprite against the body's
drawn radius; `CLOUD_*`/`EMISSIVE_*` tune Earth's layered maps.
