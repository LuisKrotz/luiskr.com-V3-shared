[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/autoplay](../README.md) / startAutoplay

```ts
function startAutoplay(host): void
```

Defined in: website/components/carousel/mentions-deck/autoplay.ts:20

Starts the auto-advance ticker. Bails (and actively stops any running
cycle) under reduced-motion, before ≥50% visibility, or while a
page-covering overlay owns the frame — autoplay must never run on an
unseen, covered, or motion-sensitive deck. Re-bases the clock on each
start so a fresh cycle always gets a full dwell.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
