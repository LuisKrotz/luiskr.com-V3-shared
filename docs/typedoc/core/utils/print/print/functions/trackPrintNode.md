[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/print/print](../README.md) / trackPrintNode

```ts
function trackPrintNode(el): void
```

Defined in: core/utils/print/print.ts:3197

Registers a listener-injected print node for the exit teardown — same
fate as the adapter's own copies and covers: the node is removed when
the job ends so screen state restores clean.

## Parameters

### el

`Element`

Root element the listener injected for print.

## Returns

`void`
