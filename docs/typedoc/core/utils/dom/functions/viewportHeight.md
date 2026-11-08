[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / viewportHeight

```ts
function viewportHeight(): number
```

Defined in: core/utils/dom.ts:249

Returns `window.innerHeight`, memoized within the current task. The
first call takes the (layout-forcing) hit; every subsequent caller in
the same task reuses the number.

## Returns

`number`

viewport height in px, or 0 without a window (SSR/tests).
