[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / viewportWidth

```ts
function viewportWidth(): number
```

Defined in: core/utils/dom.ts:221

Returns `window.innerWidth`, memoized within the current task. The
first call takes the (layout-forcing) hit; every subsequent caller in
the same task reuses the number — after DOM writes this keeps a burst
of N reads down to a single possible reflow at the batch head.

## Returns

`number`

viewport width in px, or 0 without a window (SSR/tests).
