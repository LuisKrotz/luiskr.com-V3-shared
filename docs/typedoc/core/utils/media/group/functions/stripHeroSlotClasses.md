[**luiskr.com**](../../../../../README.md)

---

[luiskr.com](../../../../../README.md) / [core/utils/media/group](../README.md) / stripHeroSlotClasses

```ts
function stripHeroSlotClasses(itemClass): string
```

Defined in: core/utils/media/group.ts:71

The CMS `class` list minus the hero-slot tokens. A slide or mosaic tile
built from the cover media inherits the item's raw class string
unchanged — forwarded onto its <media-figure>, `internal-main-item` /
`ztf-video` re-trigger the 0,3,0 hero selectors (they outrank every
slide rule, inflating the laddered box to the 70dvh/175dvh hero caps —
the blown-out landscape slide bug). The slide WRAPPER keeps the full
class list for context/variant selectors; only the figure is scrubbed.

## Parameters

### itemClass

`string`

The item's raw CMS class string.

## Returns

`string`

The class string safe to forward onto a slide/tile figure.
