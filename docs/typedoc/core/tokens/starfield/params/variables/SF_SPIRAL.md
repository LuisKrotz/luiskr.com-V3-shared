[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_SPIRAL

```ts
const SF_SPIRAL: Readonly<{
  COUNT: 60000;
  COUNT_MAX: 1000000;
  MOBILE_DIVISOR: 4;
  MOBILE_WIDTH: 900;
  VOLUMETRIC_OPACITY: 0.18;
  VOLUMETRIC_PX: 1;
  VOLUMETRIC_THICK: 0.45;
  VOLUMETRIC_HALO: 0;
  VOLUMETRIC_COUNT: 100000;
  INNER_SPIN_R: 0.3;
  DUST_COUNT: 3200;
  DUST_PX: 14;
  DUST_OPACITY: 0.55;
  DUST_R_MIN: 0.18;
  DUST_R_MAX: 0.85;
  ARMS: 4;
  WIND: 5.2;
  THIN: 0.08;
  POINT_PX: 1.6;
  BULGE: 0.18;
  CORE_PHOTO: 0.45;
  CORE_GLOW: 0.9;
  CORE_R: 1;
  CORE_G: 0.86;
  CORE_B: 0.6;
  EDGE_R: 0.66;
  EDGE_G: 0.62;
  EDGE_B: 0.78;
  HALO_RADIUS: 0.6;
  ELLIPSE_RADIAL: 0.9;
  ELLIPSE_FLAT: 0.6;
  ELLIPSE_CORE: 1.05;
  ELLIPSE_FADE: 0.7;
  ELLIPSE_EDGE: 0.55;
  SUN_BUBBLE: 42;
}>;
```

Defined in: core/tokens/starfield/params.ts:389

Procedural spiral-galaxy point cloud — Gaia-style star distribution:
`COUNT` points spread over `ARMS` logarithmic arms plus a bulge, sized
by `POINT_PX`; `WIND` is the arm winding tightness and `THIN` the disc
thickness ratio. One Points draw call per galaxy — the "all stars"
layer beneath the named catalog markers.
