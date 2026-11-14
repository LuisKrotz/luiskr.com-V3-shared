[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/print](../README.md) / PRINT\_TIMING

```ts
const PRINT_TIMING: Readonly<{
  MM_EXIT_DEBOUNCE: 500
  PREP_CAP: 90000
  PREP_CAP_HARD: 300000
  SETTLE_TICK: 150
  SETTLE_QUIET_TICKS: 4
  DIALOG_GRACE: 2000
  MM_APPLY_GRACE: 4000
}>
```

Defined in: core/tokens/motion/print.ts:11

Print-lifecycle timing tokens. Sole declaration site — consumers import
members from this frozen map rather than re-declaring the literals
(zero-hardcoding rule).
