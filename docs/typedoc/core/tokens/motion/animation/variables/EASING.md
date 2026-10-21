[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/animation](../README.md) / EASING

```ts
const EASING: Readonly<{
  EASING: `cubic-bezier(${string})`
  EASING_POINTS: readonly [0.22, 1, 0.36, 1]
  PAGE_EASING: 'cubic-bezier(0.16, 1, 0.3, 1)'
  CSS_EASE_POINTS: readonly [0.25, 0.1, 0.25, 1]
}>
```

Defined in: core/tokens/motion/animation.ts:26

Easing curve + transition duration tokens. Sole declaration site — consumers import members
from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
