[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/deck](../README.md) / applyPoses

```ts
function applyPoses(host): void
```

Defined in: website/components/carousel/mentions-deck/deck.ts:189

Writes every card's pose for the current virtual front `f` — derived
from `activeIdx - _dragX/_step`, so a live drag slides the whole strip
continuously and `activeIdx` alone reproduces the rest pose. Card width/
height write once per measure() (_sizesDirty); the --active class and
a11y flags ride the same pass. Runs inside the gesture rAF — reads are
cached fields, writes are transform/opacity/zIndex/visibility only.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
