[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/frame-budget](../README.md) / FRAME\_BUDGET

```ts
const FRAME_BUDGET: Readonly<{
  MOBILE_MS: number
  DESKTOP_MS: number
  MOBILE_HZ: 120
  DESKTOP_HZ: 240
}>
```

Defined in: core/tokens/motion/frame-budget.ts:17

Animation frame budgets in milliseconds. The site targets high-rate
displays: mobile renders at ≥120Hz (8.33ms/frame) and desktop at
≥240Hz (4.16ms/frame). Per-frame JS work (rAF callbacks, pointermove
handlers that touch visual state, tick math) must complete inside
these ceilings — anything heavier routes through worker/WASM/GPU
paths per the perf-compute-offload conventions.
