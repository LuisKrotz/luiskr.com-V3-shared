[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/gestures](../README.md) / onPointerMove

```ts
function onPointerMove(host, e): void
```

Defined in: website/components/carousel/mentions-deck/gestures.ts:95

Pointer-move — consumes the coalesced sample stream (1000–8000Hz mice
deliver several per frame; only the last position matters). Before the
slop commits the gesture, a steeper vertical track yields to page
scroll; after it, `_dragX` updates and ONE rAF writes the strip. The first
committed frame also freezes autoplay so the dwell can't fire mid-drag.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

### e

`Event`

The pointermove event.

## Returns

`void`
