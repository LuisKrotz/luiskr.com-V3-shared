[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/media/draw-text/fit](../README.md) / teardownFit

```ts
function teardownFit(host): void
```

Defined in: website/components/media/draw-text/fit.ts:235

Disconnects the fit observer, drops any queued batch entry, and
restores the stylesheet font sizing — called on disconnect and when
the `fit` attribute is removed.

## Parameters

### host

[`DrawText`](../../../DrawText/classes/DrawText.md)

— the draw-text element

## Returns

`void`
