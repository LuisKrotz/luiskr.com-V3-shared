[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/marquee](../README.md) / TITLE\_MARQUEE

```ts
const TITLE_MARQUEE: Readonly<{
  COPIES: 2
  MIN_REPEAT: 4
  SAFETY_REPEAT: 1
  SPEED_PX_S: 90
  FALLBACK_S: 60
}>
```

Defined in: core/tokens/motion/marquee.ts:12

Frozen title-marquee map — sole declaration site for these tokens; consumers read members and
never re-declare the literals (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.
