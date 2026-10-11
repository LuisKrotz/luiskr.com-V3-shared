[**luiskr.com**](../../../../../../README.md)

***

[luiskr.com](../../../../../../README.md) / [website/components/carousel/awards-carousel/nav](../README.md) / scheduleTeleport

```ts
function scheduleTeleport(host, targetIdx): void;
```

Defined in: website/components/carousel/awards-carousel/nav.ts:66

Clone→real teleport for the infinite loop: waits TELEPORT_DELAY (420ms,
just past the smooth-scroll duration) so the clone finishes animating
in, then instant-jumps to its real twin — invisible because the clone
and real slide are pixel-identical. A pending teleport is cancelled so
rapid nav can't queue competing jumps.

## Parameters

### host

[`AwardsCarousel`](../../../AwardsCarousel/classes/AwardsCarousel.md)

The AwardsCarousel element.

### targetIdx

`number`

Real-slide index to land on after the clone animates.

## Returns

`void`
