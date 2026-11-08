[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/autoplay](../README.md) / stopAutoplay

```ts
function stopAutoplay(host): void
```

Defined in: website/components/carousel/mentions-deck/autoplay.ts:38

Stops auto-advance (reduced-motion, offscreen, overlay). Cancels the
pending RAF so no stray tick survives and clears the dwell accumulation.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
