[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/nav](../README.md) / scheduleTeleport

```ts
function scheduleTeleport(c, targetIdx): void
```

Defined in: website/components/carousel/custom-carousel/nav.ts:258

Arms the clone→real teleport: `pendingTeleport` is the normal path —
the scroll spring's settle fires it through `settleNav` the frame the
clone parks. The TELEPORT_DELAY timer is only the rAF-starvation
watchdog (hidden tab): if the spring can't run, the instant jump
still lands — invisible either way since clone and twin are
pixel-identical. A pending teleport is cancelled first so rapid nav
can't queue competing jumps.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

### targetIdx

`number`

Real-slide index to land on.

## Returns

`void`
