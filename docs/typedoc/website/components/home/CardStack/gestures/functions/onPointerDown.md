[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/gestures](../README.md) / onPointerDown

```ts
function onPointerDown(host, e): void
```

Defined in: website/components/home/cardstack/gestures.ts:48

Pointer-down on the deck — arms gesture bookkeeping only. Pointer
capture is deliberately NOT taken here: capturing on down retargets
the synthesized click to the capture element, so plain taps on cards
would never reach the link handlers. Capture arms the moment the
drag commits past slop (onPointerMove) — committed drags suppress
the trailing click anyway. Non-primary buttons and already-tracked
pointers are ignored.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

### e

`Event`

## Returns

`void`
