[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/autoplay](../README.md) / pauseAutoplay

```ts
function pauseAutoplay(host): void
```

Defined in: website/components/carousel/mentions-deck/autoplay.ts:52

Freezes the dwell clock (hover, committed drag) — accumulates the
partially-spent dwell into autoplayElapsed and cancels the RAF, but
keeps autoplayRunning so resumeAutoplay can re-arm the ticker.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
