[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/route-warmer](../README.md) / startRouteWarming

```ts
function startRouteWarming(): void
```

Defined in: core/utils/motion/route-warmer.ts:76

Arms warming on the first interaction signal (or the long quiet-window
bound) — each chunk still resolves inside an idle slice once released.
Warming at load put the unused-route chunk evals inside the interactive
window for users who never navigated at all.

## Returns

`void`
