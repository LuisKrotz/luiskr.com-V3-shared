[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/home/cardstack/deck](../README.md) / applyPoses

```ts
function applyPoses(host): void
```

Defined in: website/components/home/cardstack/deck.ts:452

Writes every card's pose for the current virtual front `f` — derived
from `activeIdx - _dragX/_step`, so a live drag slides the whole
coverflow continuously and `activeIdx` alone reproduces the rest pose.
Card width/height and the deck perspective (the tier's camera
distance) write once per measure() (_sizesDirty); the --active class
rides the same pass. Runs inside the gesture rAF — reads are cached
fields, writes are transform/opacity/zIndex/visibility only.

## Parameters

### host

[`CardStack`](../../../CardStack/classes/CardStack.md)

The CardStack element.

## Returns

`void`
