[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/starfield/params](../README.md) / SF\_BH

```ts
const SF_BH: Readonly<{
  PHOTON_RING: 1.35;
  DISC_INNER: 1.6;
  DISC_OUTER: 4.2;
  SWIRL_COUNT: 2600;
  SWIRL_PX: 1.4;
  JET_LEN: 9;
  JET_WIDTH: 0.55;
  JET_TIP: 0.06;
  JET_OPACITY: 0.1;
  GLOW_SCALE: 6;
  GLOW_OPACITY: 0.32;
  PHOTON_TUBE: 0.07;
  PHOTON_OPACITY: 0.95;
  DISC_OPACITY: 0.5;
  DISC_SEGMENTS: 128;
  DISC_LANE_FLOOR: 0.62;
  DISC_LANE_AMP: 0.38;
  DISC_LANE_ANG_A: 5;
  DISC_LANE_RAD_A: 0.9;
  DISC_LANE_RAD_B: 2.3;
  DISC_LANE_ANG_B: 2;
  DISC_CORE_EXP: 1.6;
  DISC_A_FLOOR: 0.25;
  DISC_A_AMP: 0.75;
  SWIRL_PUFF: 0.12;
  SWIRL_BIAS: 0.4;
  SWIRL_CORE_R: 1;
  SWIRL_CORE_G: 0.82;
  SWIRL_CORE_B: 0.5;
  SWIRL_EDGE_R: 0.65;
  SWIRL_EDGE_G: 0.52;
  SWIRL_EDGE_B: 0.18;
}>;
```

Defined in: core/tokens/starfield/params.ts:137

Black-hole feature tuning — Sgr A* renders as a layered relativistic
object: the event-horizon sphere, a thin photon ring, a hot accretion
torus plus a swirl of orbiting plasma particles, and twin polar jets.
All sizes are multiples of the catalog `radius` so the dossier value
stays the single source of truth.
