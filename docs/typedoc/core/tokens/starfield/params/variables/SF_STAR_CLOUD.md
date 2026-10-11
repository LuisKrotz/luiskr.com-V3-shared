[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_STAR\_CLOUD

```ts
const SF_STAR_CLOUD: Readonly<{
  FILE: "deep-field.bin";
  STRIDE: 6;
  MAX_STARS: 300000;
  UNITS_PER_LY: number;
  SUN_GC_LY: 26700;
  POINT_PX: 1.35;
  LOD_DIST: 400;
  CI_LOW: 0;
  CI_WARM: 0.45;
  CI_GOLD: 0.9;
  CI_RED: 1.55;
  MAG_BIAS: 1.12;
  MAG_SLOPE: 0.13;
  MAG_FLOOR: 0.16;
  FAR_CLAMP: 1900;
  KIND_STAR: 0;
  KIND_EXOPLANET: 1;
  KIND_DSO: 2;
  REGISTRY_ACQUIRED: "2026-10-09";
  MLY: 1000000;
  SRC_HYG: "HYG Database v4 (Hipparcos/Gliese/Tycho)";
  SRC_EXO: "NASA Exoplanet Archive (pscomppars)";
  SRC_DSO: "OpenNGC database (NGC/IC catalogue)";
  SHARD_SIZE: 1000;
  REGISTRY_KINDS: readonly ["star", "exoplanet", "dso"];
  SEARCH_LIMIT: 200;
  PAGE_SIZE: 100;
  FLY_OFFSET: 3;
}>;
```

Defined in: core/tokens/starfield/params.ts:487

Real star-cloud layer — HYG/Hipparcos catalogued stars (78k, mag ≤ 9,
heliocentric light-years) decoded from a packed Float32 binary and
drawn as one Points call at the Sun's true galactocentric position on
the Milky Way disc, so zooming toward the disc reveals real stellar
density rather than a stylized sprite. The proper-named subset lives
in the milky-way dossier JSON (`namedStars`) for future labelling.
