[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_DETAIL

```ts
const SF_DETAIL: Readonly<{
  MASK_PX: 1024;
  MASK_INNER: 0.62;
  RING_V: 0.5;
  RING_INNER: 1.24;
  RING_OUTER: 2.28;
  HALO_SCALE: 4.6;
  HALO_OPACITY: 0.55;
  STAR_RIM_FALLOFF: 2.2;
  SAT_RIM_FALLOFF: 1.5;
  CLOUD_SCALE: 1.018;
  CLOUD_OPACITY: 0.55;
  EMISSIVE_INT: 0.9;
  BUMP_SCALE: 0.05;
  SPARKLE_FRAC: 0.05;
  SPARKLE_PX: 2.4;
  PICK_MIN: 2;
  GALAXY_DISC: 2.2;
}>;
```

Defined in: core/tokens/starfield/params.ts:328

Photographic-surface tuning — the real-imagery rendering layer for
planets and deep-sky objects. Photo masks feather a source image's
rectangular edge into transparency so NASA/ESA stills composite into
the black scene; `MASK_PX` caps the composite canvas (source images
run 1–6k px but are viewed at tens of screen px). Ring UVs are
remapped radially (`RING_V` samples the strip's center row) because
RingGeometry ships planar UVs but the Saturn strip is radius-indexed.
`HALO_SCALE` sizes the additive star-glow sprite against the body's
drawn radius; `CLOUD_*`/`EMISSIVE_*` tune Earth's layered maps.
