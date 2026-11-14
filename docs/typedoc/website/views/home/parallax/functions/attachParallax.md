[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/home/parallax](../README.md) / attachParallax

```ts
function attachParallax(view): void
```

Defined in: website/views/home/parallax.ts:457

Arms the session: builds the media-query gates, binds the passive
scroll + resize listeners (auto-cleaned on disconnect through
addScopedListener) and the ResizeObserver, then runs the first gate
evaluation.

## Parameters

### view

[`ViewHome`](../../Home/classes/ViewHome.md)

The home view.

## Returns

`void`
