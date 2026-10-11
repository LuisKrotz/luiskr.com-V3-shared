[**luiskr.com**](../../../../../README.md)

***

[luiskr.com](../../../../../README.md) / [core/tokens/media/dimensions](../README.md) / SCROLL\_TIMINGS

```ts
const SCROLL_TIMINGS: Readonly<{
  SCROLL_DURATION_FULL: 1000;
  SCROLL_DURATION_REDUCED: 2500;
  SCROLL_INIT_DELAY: 500;
}>;
```

Defined in: core/tokens/media/dimensions.ts:112

Frozen scroll-timing map (ms) — `SCROLL_DURATION_FULL` paces animated
page scrolls, `SCROLL_DURATION_REDUCED` is the slower ramp under
prefers-reduced-motion (longer, gentler rather than instant so the jump
stays perceivable), `SCROLL_INIT_DELAY` defers scroll restoration until
after first paint settles.
