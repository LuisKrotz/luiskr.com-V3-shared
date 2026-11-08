[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/dom/orphan-seps](../README.md) / watchOrphanSeps

```ts
function watchOrphanSeps(nav, pairCls, leadCls): () => void
```

Defined in: core/utils/dom/orphan-seps.ts:49

Watches a footer nav and keeps every wrap-leading pair marked so its
leading separator can be hidden. A ResizeObserver on the nav refires
whenever the row re-wraps (viewport resize, font load, locale switch);
the synchronous first pass covers the mount layout. Returns a teardown
that disconnects the observer.

## Parameters

### nav

`Element`

The footer nav element (query root for the pairs).

### pairCls

`string`

The pair class (dot+item atomic unit).

### leadCls

`string`

The modifier toggled on wrap-leading pairs.

## Returns

Cleanup function disconnecting the observer.

() => `void`
