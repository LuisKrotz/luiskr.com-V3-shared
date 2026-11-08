[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/autoplay](../README.md) / toggleAutoplay

```ts
function toggleAutoplay(host): void
```

Defined in: website/components/home/cardstack/autoplay.ts:175

The play/pause transport: running → pause (banks the in-flight span,
the light freezes mid-orbit); paused → resume (the light continues
from its frozen point); off → a fresh 10s arm on the current card.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
