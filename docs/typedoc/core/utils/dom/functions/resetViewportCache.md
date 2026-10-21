[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / resetViewportCache

```ts
function resetViewportCache(): void
```

Defined in: core/utils/dom.ts:239

Test/invalidate hook — clears the memoized width. Test suites call it
between cases since jsdom/happy-dom innerWidth is mutable mid-test.

## Returns

`void`
