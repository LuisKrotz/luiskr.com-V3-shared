[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/dom](../README.md) / resetViewportCache

```ts
function resetViewportCache(): void
```

Defined in: core/utils/dom.ts:268

Test/invalidate hook — clears the memoized viewport readings. Test
suites call it between cases since jsdom/happy-dom innerWidth and
innerHeight are mutable mid-test.

## Returns

`void`
