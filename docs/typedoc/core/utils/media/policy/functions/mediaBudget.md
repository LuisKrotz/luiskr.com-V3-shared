[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/policy](../README.md) / mediaBudget

```ts
function mediaBudget(): MediaBudget
```

Defined in: core/utils/media/policy.ts:39

Reads the Network Information API when the engine exposes it —
`navigator.connection` is Chromium-only, so Firefox/Safari always
resolve 'full' and the policy degrades to the old unrestricted climb.

## Returns

[`MediaBudget`](../type-aliases/MediaBudget.md)

The media spend tier for this connection.
