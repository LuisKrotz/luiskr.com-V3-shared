[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/weather](../README.md) / SF\_AURORA

```ts
const SF_AURORA: Readonly<{
  LAT0: 0.87
  OVAL_W: 0.045
  LAT_WOBBLE: 0.05
  WOBBLE_FREQ: 2.6
  WOBBLE_DRIFT: 0.05
  FOLD_FREQ: 160
  FOLD_JAG: 6
  FOLD_SHARP: 2.2
  FOLD_DRIFT: 0.2
  FOLD_FLOOR: 0.18
  ARC2_OFF: 0.035
  ARC2_GAIN: 0.35
  PATCH_FREQ: 3.4
  PATCH_GAIN: 0.55
  PATCH_DRIFT: 0.18
  ARC_FREQ: 1.4
  ARC_DRIFT: 0.11
  ARC_GAIN: 0.9
  INTENSITY: 0.28
  SHELL_SCALE: 1.02
  LIMB_POW: 2.2
  TILT: 0.19
  NIGHT_LO: 0.3
  NIGHT_HI: -0.25
  DAY_FLOOR: 0.01
  HEMI_LO: 0.05
  HEMI_HI: 0.3
  TOP: 3866508
  LOW: 11555071
}>
```

Defined in: core/tokens/starfield/params/weather.ts:170

Aurora ovals — thin rayed emission rings centered on each planet's
MAGNETIC pole (not the spin pole — a per-body `tilt` rotates the
sampling frame so Neptune's 47° dipole offset reads as an oval swung
far off the axis). A second, higher shell carries the curtain tops
so the arcs stand off the limb instead of painting a flat cap.
