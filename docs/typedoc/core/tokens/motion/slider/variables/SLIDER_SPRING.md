[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/slider](../README.md) / SLIDER\_SPRING

```ts
const SLIDER_SPRING: Readonly<{
  SNAP_K: 170
  SNAP_C: 18.8
  DRAG_K: 420
  DRAG_C: 41
  SETTLE_EPS: 0.0005
  VEL_EPS: 0.02
  DT_MAX_S: 0.05
  DT_INIT_S: number
}>
```

Defined in: core/tokens/motion/slider.ts:19

## File

tokens/motion/slider.ts

## Description

Knob-spring tunables for the slider widgets (theme
slider, switch slider). Sole declaration site (zero-hardcoding
rule): the WebGL render loops, the 2D fallbacks, and the wasm
state pushes all chase `targetP` through the same damped spring —
`v += (−(p−target)·K − v·C)·dt; p += v·dt` — replacing the old
frame-rate-coupled geometric lerp.

Two regimes share the integrator:
SNAP — release/tap/programmatic moves: ωn=√170≈13.0 rad/s,
ζ≈0.72 → ~4% overshoot, settle ≈0.4s — the little elastic
arrival that reads organic instead of dead.
DRAG — finger-follow: ζ=1.0 (critically damped, ωn≈20.5) — the
knob tracks the pointer with a ~50ms fluid lag, never
oscillates, and inherits velocity into the release snap so a
flick whips into the stop.
