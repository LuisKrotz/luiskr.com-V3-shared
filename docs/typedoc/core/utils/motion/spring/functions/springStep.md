[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/spring](../README.md) / springStep

```ts
function springStep(s, k, c, dt, epsSettle?, epsVel?): void
```

Defined in: core/utils/motion/spring.ts:41

Advances one integration step: accelerates toward `targetP` under
stiffness `k` and damping `c`, then snaps to the stop once both the
gap and the velocity fall under the settle epsilons — without the
snap an underdamped spring rings sub-pixel forever.

## Parameters

### s

[`SpringChase`](../interfaces/SpringChase.md)

The chase state — mutated in place (zero allocation).

### k

`number`

Spring stiffness (ωn²).

### c

`number`

Spring damping (2ζωn).

### dt

`number`

Integration step in seconds (clamped upstream).

### epsSettle?

`number` = `SLIDER_SPRING.SETTLE_EPS`

Settle epsilon in the state's units — the slider
widgets' normalized default; px-space callers (scroll spring) pass
their own.

### epsVel?

`number` = `SLIDER_SPRING.VEL_EPS`

Velocity settle epsilon (state units/s) — see epsSettle.

## Returns

`void`
