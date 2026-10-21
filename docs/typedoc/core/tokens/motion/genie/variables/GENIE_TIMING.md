[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/tokens/motion/genie](../README.md) / GENIE\_TIMING

```ts
const GENIE_TIMING: Readonly<{
  OPEN_MS: 640
  CLOSE_MS: 700
  DT_MAX_S: 0.05
  MOUNT_MS: 400
  MAX_MS: 1400
}>
```

Defined in: core/tokens/motion/genie.ts:122

Progress driver — a duration clock over linear time. `p = opening ?
1−raw : raw`: the close runs 0→1 (modal → figure) and the open
evaluates the identical field in time-reverse — the literal reverse
animation macOS plays on restore — so both directions share one
liquid surface. No global easing curve: the reference is linear-time
by design — the motion character lives entirely in the per-row
staggered eases (x rows ease-in-out, y rows ease-in so the suck
accelerates into the card).
