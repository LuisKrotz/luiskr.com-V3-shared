[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/project/carousels](../README.md) / scaleCarouselItem

```ts
function scaleCarouselItem(item): ProjectMediaItem
```

Defined in: website/views/project/carousels.ts:34

Desktop downscale for one carousel item — the division calc is for
WIDTH, not height: ÷2 always applies (the retina-density cap), then
each further ladder step (÷3 → ÷4 → ÷5) compounds on the running
width ONLY while the slide is still at least viewport-wide — "if
needed" in the spec: once it fits inside the window it already is
the max-area render with neighbour peeks, so the ladder stops.
The DESKTOP_SCALE_MIN_W floor is the backstop — the next step never
drops the media under it; the accumulated divisor then applies to
height — aspect preserved. A 3840px item lands ~640px wide at
1920px viewport (1920 → 640), a 1920px item ~960px; small items
below the first step stay natural.
`naturalSize` keeps the untouched CMS dims — the expand modal stamps
those (the modal never reduces) while `size` stays the display
contract for the carousel's dense-pixel render.

## Parameters

### item

[`ProjectMediaItem`](../../types/interfaces/ProjectMediaItem.md)

The media item (mutates a shallow copy's `size` only).

## Returns

[`ProjectMediaItem`](../../types/interfaces/ProjectMediaItem.md)

A copy with the scaled `size` + recorded `naturalSize`, or the item unchanged.
