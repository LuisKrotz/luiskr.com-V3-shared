[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/mentions-deck/autoplay](../README.md) / resumeAutoplay

```ts
function resumeAutoplay(host): void
```

Defined in: website/components/carousel/mentions-deck/autoplay.ts:67

Re-arms the dwell clock after a pause — a no-op when autoplay is not
running or a tick is already scheduled, and it never resurrects a cycle
the gates (reduced-motion, visibility, overlay) would refuse.

## Parameters

### host

[`MentionsDeck`](../../../MentionsDeck/classes/MentionsDeck.md)

The MentionsDeck element.

## Returns

`void`
