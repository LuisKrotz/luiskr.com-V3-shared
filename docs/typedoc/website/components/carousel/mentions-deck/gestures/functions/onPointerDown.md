[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/gestures](../README.md) / onPointerDown

```ts
function onPointerDown(host, e): void
```

Defined in: website/components/carousel/mentions-deck/gestures.ts:48

Pointer-down on the deck — arms gesture bookkeeping and takes the
capture so the move/up stream keeps landing on the deck even when the
pointer leaves the card mid-swipe. Non-primary mouse buttons and
already-tracked pointers are ignored.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

### e

`Event`

The pointerdown event.

## Returns

`void`
