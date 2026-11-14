[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/gestures](../README.md) / onPointerEnd

```ts
function onPointerEnd(host, e): void
```

Defined in: website/components/home/cardstack/gestures.ts:161

Pointer-up/cancel — settles the gesture. Drag fraction + flick velocity
decide: advance one card in the drag direction or snap the fan back to
the current front. A committed drag also suppresses the trailing click
so it can't fire navigation.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

### e

`Event`

## Returns

`void`
