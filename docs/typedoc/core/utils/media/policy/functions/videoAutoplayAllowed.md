[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/policy](../README.md) / videoAutoplayAllowed

```ts
function videoAutoplayAllowed(): boolean
```

Defined in: core/utils/media/policy.ts:65

Whether muted autoplay may attach sources and start playback. A low
budget treats video like reduced-motion: the poster stays painted and
no stream bytes are fetched — a 14 MB muted loop can never become the
LCP tax on a metered connection.

## Returns

`boolean`
