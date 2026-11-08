[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [website/views/project/carousels](../README.md) / scaleCarouselItem

```ts
function scaleCarouselItem(item): ProjectMediaItem
```

Defined in: website/views/project/carousels.ts:30

Desktop downscale for one carousel item — the division calc is for
WIDTH, not height: each ladder step (÷2 → ÷1.5 → ÷1.75) compounds on
the running width while the result still clears DESKTOP_SCALE_MIN_W;
once the media falls under the width check (the next step would drop
it below the floor), the accumulated divisor is applied to height —
aspect preserved. A 1980px item lands ~377px wide, a 997px item
~332px; small items below the first step stay natural.
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
