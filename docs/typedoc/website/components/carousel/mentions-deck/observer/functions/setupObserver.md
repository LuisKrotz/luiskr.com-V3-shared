[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/observer](../README.md) / setupObserver

```ts
function setupObserver(host): void
```

Defined in: website/components/carousel/mentions-deck/observer.ts:19

Autoplay only runs while ≥50% of the deck is on screen (threshold
[0, 0.5] gives a clean two-state signal); below that or under
reduced-motion it pauses — offscreen animation would burn frames the
user can't see. When IntersectionObserver itself is absent (very old
engines, some test DOMs) the deck degrades to always-visible so content
still shows.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
