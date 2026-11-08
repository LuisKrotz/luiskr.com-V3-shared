[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/gestures](../README.md) / onPointerMove

```ts
function onPointerMove(host, e): void
```

Defined in: website/components/home/cardstack/gestures.ts:78

Pointer-move — consumes the coalesced sample stream (1000–8000Hz mice
deliver several per frame; only the last position matters). Before the
slop commits the gesture, a steeper vertical track yields to page
scroll; after it, `_dragX` updates and ONE rAF writes the fan.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

### e

`Event`

## Returns

`void`
