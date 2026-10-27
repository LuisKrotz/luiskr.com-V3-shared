[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/motion/intent](../README.md) / onUserIntent

```ts
function onUserIntent(cb): void
```

Defined in: core/utils/motion/intent.ts:36

Runs `cb` on the first user-interaction signal (pointer, key, touch,
scroll) or after `PREFETCH_CONFIG.INTENT_FALLBACK` ms of quiet —
whichever arrives first, exactly once. Listeners are passive so the
gate never delays an input.

## Parameters

### cb

() => `void`

Warm work to release on intent.

## Returns

`void`
