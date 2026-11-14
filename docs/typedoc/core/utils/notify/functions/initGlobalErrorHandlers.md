[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/notify](../README.md) / initGlobalErrorHandlers

```ts
function initGlobalErrorHandlers(): boolean
```

Defined in: core/utils/notify.ts:207

Wires window 'error' + 'unhandledrejection' to the generic error toast so
uncaught failures surface gracefully instead of only logging. Idempotent.

## Returns

`boolean`

false outside a windowed context
