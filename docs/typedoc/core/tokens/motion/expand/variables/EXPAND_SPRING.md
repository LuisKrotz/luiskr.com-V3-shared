[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/expand](../README.md) / EXPAND\_SPRING

```ts
const EXPAND_SPRING: Readonly<{
  K: 140
  C: 24
  SETTLE_PX: 0.5
  VEL_EPS: 30
  DT_MAX_S: 0.05
  DT_INIT_S: number
  MAX_MS: 900
  MIN_TRAVEL_PX: 2
}>
```

Defined in: core/tokens/motion/expand.ts:17

Frozen expand-spring map — sole declaration site for these constants.
Damping ζ≈1.0 (critically damped): the expansion settles onto the
target without overshoot — an expanding box that dips below its
content would clip rows mid-flight; organic comes from the velocity
the chase inherits on mid-flight retargets, not from bounce.
