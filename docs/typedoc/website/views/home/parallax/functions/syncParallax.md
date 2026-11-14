[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/home/parallax](../README.md) / syncParallax

```ts
function syncParallax(view): void
```

Defined in: website/views/home/parallax.ts:505

Public sync — the view calls this from onUpdated (fresh render →
re-resolve + re-gate) and onStoreUpdate (locale/reduced-motion pushes
re-evaluate the motion gate). Cheap when nothing changed: the
identity-parked layers skip straight to the gate compare.

## Parameters

### view

[`ViewHome`](../../Home/classes/ViewHome.md)

The home view.

## Returns

`void`
