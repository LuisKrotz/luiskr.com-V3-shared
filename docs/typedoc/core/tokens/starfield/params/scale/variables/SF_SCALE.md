[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [core/tokens/starfield/params/scale](../README.md) / SF\_SCALE

```ts
const SF_SCALE: Readonly<{
  GALACTIC_LY: 0.004
  GALACTIC_BREAK: 100000
  LOCAL_GROUP_LY: 0.04
  LOCAL_GROUP_BREAK: 10000000
  COSMIC_LY: 1
  COSMIC_CLAMP: 500000000
  MW_TILT: 0.35
  MW_DISC_LY: 52000
  CO_ROTATE_R: 20000000
  SOLAR_SCALE: 1
}>
```

Defined in: core/tokens/starfield/params/scale.ts:27

Astronomical scale tiers — the chart is a multi-scale diagram, not a
linear map: 20 orders of magnitude separate Neptune's orbit from the
observable universe, so distance compresses in three documented tiers
while every direction stays astronomically true.

Galactic tier — 1 unit = 100 ly; the Milky Way disc (radius 520
units ≈ 52 000 ly) and its satellite dwarfs sit at
real scale relative to each other. The Sun rests at
267 units ≈ 26 700 ly from the disc centre.
Local-Group — beyond 1 Mly the scale drops to 800 ly/unit so M31
tier lands ~11 900 units out (true direction kept).
Cosmic tier — beyond 10 Mly the scale drops to 20 000 ly/unit;
superclusters and the observable-universe boundary
shell clamp onto the far field (~46k units) inside
the skybox.
