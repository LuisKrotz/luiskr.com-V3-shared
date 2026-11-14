[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/gestures](../README.md) / onPointerDown

```ts
function onPointerDown(host, e): void
```

Defined in: website/components/carousel/mentions-deck/gestures.ts:55

Pointer-down on the deck — arms gesture bookkeeping only. Pointer
capture is deliberately NOT taken here: capturing on down retargets
the synthesized click to the capture element, so plain taps on cards
would never reach the outbound anchors. Capture arms the moment the
drag commits past slop (onPointerMove) — committed drags suppress
the trailing click anyway. A fresh gesture also clears a stale
`_suppressClick`: when a swipe or pointercancel synthesizes no
trailing click (touch), an unconsumed flag would otherwise swallow
the next real link click — the browser's own trailing click after a
drag is never preceded by a new pointerdown. Non-primary mouse
buttons and already-tracked pointers are ignored.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

### e

`Event`

The pointerdown event.

## Returns

`void`
