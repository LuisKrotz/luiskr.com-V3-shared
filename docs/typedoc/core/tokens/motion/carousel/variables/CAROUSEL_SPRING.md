[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/carousel](../README.md) / CAROUSEL\_SPRING

```ts
const CAROUSEL_SPRING: Readonly<{
  K: 96
  C: 20
  SETTLE_PX: 0.5
  VEL_EPS: 24
  DT_MAX_S: 0.05
  DT_INIT_S: number
  MAX_MS: 1400
  MIN_TRAVEL_PX: 2
}>
```

Defined in: core/tokens/motion/carousel.ts:45

Px-space chase-spring for the programmatic slide scroll — the organic,
slightly elastic slide travel that replaced the browser's fixed
`behavior:'smooth'` ease (which can't overshoot and ignores velocity
on retarget). Integrated by `springStep` in `core/utils/motion` with
px-space epsilons — same integrator the slider knobs run.

ωn = √96 ≈ 9.8 rad/s, ζ = 20/(2·√96) ≈ 1.02

ζ≈1.02 is the critical-damping boundary — the slide travels fast and
parks on the target with no visible swing-back (a measurable
under-damped overshoot read as bounce on full-slide travel); the
~0.6s settle keeps single-step navs snappy while multi-slide dot
jumps land without a hard stop.
