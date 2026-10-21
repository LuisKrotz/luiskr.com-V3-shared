[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/spiral](../README.md) / SF\_SPIRAL

```ts
const SF_SPIRAL: Readonly<{
  COUNT: 60000
  COUNT_MAX: 1000000
  MOBILE_DIVISOR: 4
  MOBILE_WIDTH: 900
  VOLUMETRIC_OPACITY: 0.18
  VOLUMETRIC_PX: 1
  VOLUMETRIC_PX_SCREEN: 3
  VOLUMETRIC_FAR_GAIN: 1.15
  VOLUMETRIC_ARM_JITTER: 0.3
  VOLUMETRIC_THICK: 0.45
  VOLUMETRIC_HALO: 0.05
  VOLUMETRIC_COUNT: 100000
  VOLUMETRIC_COUNT_MAX: 500000
  INNER_SPIN_R: 0.3
  ROTOR_DIFF: 1.6
  DUST_COUNT: 4800
  DUST_PX: 18
  DUST_OPACITY: 0.68
  DUST_R_MIN: 0.18
  DUST_R_MAX: 0.85
  DUST_JITTER: 0.3
  DUST_R: 0.02
  DUST_G: 0.012
  DUST_B: 0.008
  ARMS: 4
  GOLDEN: 1.618033988749895
  GOLDEN_ANGLE: number
  ARM_LOG_B: number
  ARM_PITCH_TIGHT: 0.85
  ARM_LOG_R0: 30
  ARM_LOG_RMIN: 6
  ARM_PITCH_VAR: 0.11
  ARM_LUM_VAR: 0.48
  ARM_SWAY_FREQ: 0.02
  ARM_SWAY_AMP: 0.3
  ARM_SWAY_CORE: 0.3
  KNOT_LOBES: 7
  KNOT_DRIFT: 2.3
  KNOT_DEPTH: 0.78
  KNOT_POW: 6
  KNOT_HOT_R: 0.85
  KNOT_HOT_G: 0.95
  KNOT_HOT_B: 1.5
  HII_FRAC: 0.4
  HII_R: 1.3
  HII_G: 0.3
  HII_B: 0.6
  BAR_X: 2.35
  LANE_MIX: 0.8
  LANE_R: 0.45
  LANE_G: 0.62
  LANE_B: 1.25
  LANE_SCATTER_INV: 0.6666666666666666
  LUM_JITTER: 0.28
  DISC_SPREAD: 1.08
  EDGE_FADE_START: 0.8
  DISC_FLARE: 0.9
  DISC_WARP: 0.05
  THIN: 0.08
  POINT_PX: 1.6
  ARM_JITTER: 0.42
  ARM_JITTER_CORE: 0.55
  ARM_JITTER_RIM: 2.4
  ARM_SPUR_FRAC: 0.2
  ARM_SPUR_JITTER: 0.55
  BULGE: 0.18
  CORE_PHOTO: 0.45
  CORE_GLOW: 0.9
  CORE_R: 1
  CORE_G: 0.86
  CORE_B: 0.6
  EDGE_R: 0.66
  EDGE_G: 0.62
  EDGE_B: 0.78
  HALO_RADIUS: 0.6
  HALO_DIM: 0.35
  ELLIPSE_RADIAL: 0.9
  ELLIPSE_FLAT: 0.6
  ELLIPSE_CORE: 1.05
  ELLIPSE_FADE: 0.7
  ELLIPSE_EDGE: 0.55
  DWARF_HALO_SCALE: 2.4
  DWARF_HALO_OPACITY: 0.5
  SUN_BUBBLE: 250
  BUBBLE_KEEP: 0.12
  BUBBLE_DIM: 0.3
  SEED_STEP: 2654435761
}>
```

Defined in: core/tokens/starfield/params/spiral.ts:19

Procedural spiral-galaxy point cloud — Gaia-style star distribution:
`COUNT` points spread over `ARMS` logarithmic arms plus a bulge, sized
by `POINT_PX`; `WIND` is the arm winding tightness and `THIN` the disc
thickness ratio. One Points draw call per galaxy — the "all stars"
layer beneath the named catalog markers.
