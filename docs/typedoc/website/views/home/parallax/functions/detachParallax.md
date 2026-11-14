[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/home/parallax](../README.md) / detachParallax

```ts
function detachParallax(view): void
```

Defined in: website/views/home/parallax.ts:515

Tears the session down — observer, pending rAF and the session
reference. Scoped listeners self-clean on disconnect; the elements
die with the view so vars need no clearing.

## Parameters

### view

[`ViewHome`](../../Home/classes/ViewHome.md)

The home view.

## Returns

`void`
