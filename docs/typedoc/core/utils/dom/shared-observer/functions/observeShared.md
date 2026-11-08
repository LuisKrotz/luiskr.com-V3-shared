[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/dom/shared-observer](../README.md) / observeShared

```ts
function observeShared(el, handler, opts): SharedObserverHandle
```

Defined in: core/utils/dom/shared-observer.ts:61

Observes `el` through the pooled IntersectionObserver for `opts`,
invoking `handler` with each entry whose target is `el`. Returns a
handle whose disconnect() unobserves just this element — the pool and
its other observed targets stay alive.

## Parameters

### el

`Element`

The element to observe.

### handler

[`SharedObserverHandler`](../type-aliases/SharedObserverHandler.md)

Per-element entry callback.

### opts

`IntersectionObserverInit`

Options signature selecting the pool.

## Returns

[`SharedObserverHandle`](../interfaces/SharedObserverHandle.md)

Handle with a disconnect() matching IntersectionObserver's.
