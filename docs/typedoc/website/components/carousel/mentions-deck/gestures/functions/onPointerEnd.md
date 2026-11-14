[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/gestures](../README.md) / onPointerEnd

```ts
function onPointerEnd(host, e): void
```

Defined in: website/components/carousel/mentions-deck/gestures.ts:166

Pointer-up/cancel — settles the gesture. Drag fraction + flick velocity
decide: advance one card in the drag direction or snap the strip back to
the current front. A committed drag also suppresses the trailing click
so it can't fire navigation, then hands the dwell back to autoplay.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

### e

`Event`

The pointerup/pointercancel event.

## Returns

`void`
