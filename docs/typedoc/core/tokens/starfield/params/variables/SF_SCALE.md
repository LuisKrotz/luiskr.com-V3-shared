[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_SCALE

```ts
const SF_SCALE: Readonly<{
  GALACTIC_LY: 100;
  GALACTIC_BREAK: 1000000;
  LOCAL_GROUP_LY: 800;
  LOCAL_GROUP_BREAK: 10000000;
  COSMIC_LY: 20000;
  COSMIC_CLAMP: 46000;
  MW_TILT: 0.35;
  MW_DISC_LY: 52000;
  NEIGHBORHOOD_INNER: 300;
  NEIGHBORHOOD_BAND: 300;
  SOLAR_SCALE: 0.2;
}>;
```

Defined in: core/tokens/starfield/params.ts:82

Astronomical scale tiers — the chart is a multi-scale diagram, not a
linear map: 20 orders of magnitude separate Neptune's orbit from the
observable universe, so distance compresses in three documented tiers
while every direction stays astronomically true.

  Galactic tier  — 1 unit = 100 ly; the Milky Way disc (radius 520
                   units ≈ 52 000 ly) and its satellite dwarfs sit at
                   real scale relative to each other. The Sun rests at
                   267 units ≈ 26 700 ly from the disc centre.
  Local-Group    — beyond 1 Mly the scale drops to 800 ly/unit so M31
  tier             lands ~11 900 units out (true direction kept).
  Cosmic tier    — beyond 10 Mly the scale drops to 20 000 ly/unit;
                   superclusters and the observable-universe boundary
                   shell clamp onto the far field (~46k units) inside
                   the skybox.
