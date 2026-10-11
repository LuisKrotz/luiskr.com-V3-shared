[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_FALLBACK

```ts
const SF_FALLBACK: Readonly<{
  STAR_DENSITY: 2400;
  STAR_MAX: 1600;
  STAR_SIZE_MAX: 1.7;
  GLINT_RATIO: 0.05;
  BAND_STARS: 320;
  BAND_TILT: -0.32;
  BAND_WIDTH: 0.18;
  DIM_ALPHA: 0.35;
}>;
```

Defined in: core/tokens/starfield/params.ts:690

2D fallback starfield — painted once into a plain canvas when the WebGL
engine can't boot. Density/seed constants so the no-GPU surface still
reads as the same chart instead of a black void.
