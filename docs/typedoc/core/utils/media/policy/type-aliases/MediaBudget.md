[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/policy](../README.md) / MediaBudget

```ts
type MediaBudget = typeof MEDIA_BUDGET.LOW | typeof MEDIA_BUDGET.MEDIUM | typeof MEDIA_BUDGET.FULL
```

Defined in: core/utils/media/policy.ts:21

Media spend tier for the current connection:
low — saveData or ≤2g: never autoplay video, first rung only
medium — 3g: autoplay allowed, skip the top (uncompressed) rung
full — 4g/unknown: unrestricted
