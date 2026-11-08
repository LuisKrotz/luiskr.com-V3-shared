# `website\components\home\cardstack\render.tsx`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\render.tsx`      |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `titleLineHalves`

Breaks one `<br>`-free title segment into its two word halves at the
middle space — the featured heading always stacks over two lines
("Selected / work") even when the CMS string ships as a single line.
One-word segments pass through untouched.

- `@param` line A single title segment (no `<br>` markup left).
- `@returns` The two half-lines, or the segment itself when it holds a

### `coverSrc`

Emission-encoded original cover URL for one item stem.

### `renderCard`

One coverflow card — a stretched-link cover over the in-card project
copy. Geometry arrives via applyPoses() writes (translate3d + tilt in
the deck's perspective). The media fills the whole card on fan tiers
(the text column carries the copy there); on the stacked phone/
portrait layouts the media crops to the card's top band and the
title/description/link show in the card body — the "entire card"
presentation — so deeper cards' title bands peek below the front.

### `renderSkeleton`

Skeleton fan — three shimmer cards in the coverflow pose so the
swap doesn't shift the section geometry.

### `renderInfo`

The active-project text column — the burn-animated title, the
<draw-text> description writer and the "Check out" link; writeInfo()
re-aims them on every nav without re-rendering the section.

### `renderIndex`

The all-projects index — every item numbered with a cover thumb; CSS
lays the list out as a desktop rail and a mobile bottom sheet.

### `renderCardStack`

JSX template for the component's shadow DOM.
