[**luiskr.com**](../../../../../../README.md)

---

[luiskr.com](../../../../../../README.md) / [website/components/carousel/custom-carousel/nav](../README.md) / carouselOnTrackClick

```ts
function carouselOnTrackClick(c, e): void
```

Defined in: website/components/carousel/custom-carousel/nav.ts:474

Delegated clone-slide click — clones are `inert`, so hit-testing skips
their whole subtree and a click on one lands on the track itself. When
that happens, rect-test the clone children for the slide under the
pointer, map its track position to the real twin's index (same modulo
the wrap detector uses), and forward to the twin figure's openModal —
the identical contract a real slide's own figure click binding has.
Clicks on real slides target inside their subtree (not the track) so
they're ignored; clicks on bare track gaps find no clone and no-op.

## Parameters

### c

[`CustomCarousel`](../../../CustomCarousel/classes/CustomCarousel.md)

The CustomCarousel element.

### e

`MouseEvent`

The delegated click event.

## Returns

`void`
