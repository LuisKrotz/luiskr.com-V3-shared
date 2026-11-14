[**luiskr.com**](../../../../README.md)

---

[luiskr.com](../../../../README.md) / [core/utils/responsive-css](../README.md) / watchWidthClassGrow

```ts
function watchWidthClassGrow(cb): () => void
```

Defined in: core/utils/responsive-css.ts:114

Shared upward-crossing watcher: at most three matchMedia listeners
(tablet/desktop/wide gates — mobile has no upward signal since every
crossing that changes the class passes one of those gates) serve every
subscriber, instead of each component instance installing its own set.
On any gate change the class is re-evaluated; subscribers fire only
when the class GREW — downward crosses never un-adopt a served
cumulative tier, whose higher blocks just stop matching.

## Parameters

### cb

(`_cls`) => `void`

invoked once per upward cross with the newly-matched class.

## Returns

unsubscribe function — also tears down the shared listeners
when the last subscriber leaves.

() => `void`
