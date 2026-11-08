[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/autoplay](../README.md) / tickAutoplay

```ts
function tickAutoplay(host): void
```

Defined in: website/components/carousel/mentions-deck/autoplay.ts:87

Autoplay RAF tick — advances once `duration` has elapsed. The elapsed
calculation `now - start + accumulated` lets pause/resume continue a
partially-spent dwell instead of restarting it. `activeIdx + 1` wraps
via goTo's ring normalization — no clone slides needed.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
