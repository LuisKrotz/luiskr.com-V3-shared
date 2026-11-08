[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/data/nav-glyph](../README.md) / NAV\_GLYPH

```ts
const NAV_GLYPH: Readonly<{
  GLUE_URL: '/wasm/nav-glyph/luiskr_nav_glyph.js'
  KIND_STREAK: 0
  KIND_SWOOSH: 1
  POOL: 96
  STRIDE: 5
  FRAME_ORIGIN: 48
  FRAME_SPAN: 144
  STREAK_WIDTH: 1.6
  HUE_SPLIT: 0.5
  SLEEP_EPS: 0.002
  SEED: 2654435769
}>
```

Defined in: core/tokens/data/nav-glyph.ts:15

Frozen nav-glyph token map — sole declaration site for the particle
engine's artifact URL, emitter kinds, record layout and frame geometry;
the TS bridge and both nav icons read members instead of re-declaring
the numbers, so the JS side stays in lockstep with the rust constants.
