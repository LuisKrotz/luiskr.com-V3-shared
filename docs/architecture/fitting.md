# Fitting rules

How boxes, media, and text are fitted to each other. The sizing sources
and per-component dimensions live in [sizing.md](sizing.md); which rule
wins when two declarations collide lives in
[style-precedence.md](style-precedence.md).

## The core contract — fit the box to the media

The system's default move is **box-fitting**: given a target height (or
width), the JS engine computes the honest companion dimension from the
file's real aspect ratio and sizes the _container_ — `object-fit` then
only polices edge cases inside an already-correct box.

```
boxW = mediaH × (naturalW / naturalH)     // carousel strip
boxH = boxW   × (naturalH / naturalW)     // masonry / descriptions
scale = min(boundW/naturalW, boundH/naturalH, 1)   // contain fit, ≤1
```

`calcMediaScale`/`calcMediaBox`/`calcAspectScaled` in
`core/utils/wasm/wasm-layout.ts` are the shared implementations — WASM
fast path, identical JS fallback. Missing aspect ratios fall back to
`LAYOUT_MATH.ASPECT_FALLBACK` (~16:9).

The **inversion** (fit the media to a fixed box) is reserved for
deliberate crop surfaces — covers, avatars, thumbs — and is always
explicit (a fixed `aspect-ratio` + `object-fit:cover`), never an
accident of missing dimensions.

## `object-fit` policy per surface

| Surface                                                                                     | `object-fit`   | Why                                                                                                                                          |
| ------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Inline figures, covers, thumbs, related tiles, awards slides, mosaic tiles, carousel slides | `cover`        | The **box** is already honest (sized `stripH × ratio` or natural-clamped), so cover fills it exactly — no crop, no distortion, never upscale |
| Award logos (`aw-c-img`), mentions-deck media                                               | `contain`      | Small iconography — the whole mark must stay visible inside a fixed cell                                                                     |
| Expand-modal media item                                                                     | `scale-down`   | Show the file whole; never enlarge past natural, never crop                                                                                  |
| Safari patch `.render-placeholder`                                                          | `contain`      | The patch restores intrinsic natural size where Safari mis-clamps the box — vars become caps only                                            |
| Skeleton surfaces                                                                           | n/a (gradient) | Reserved box matches the coming media box                                                                                                    |

`object-position` is context-specific and tokenized — `top center`
(faces/thumbs), `center` (covers), `bottom`, `left center`, `right
center`. It is part of the fitting contract, not decoration.

## Aspect-ratio contracts

Every media box declares its ratio so height can follow width (or vice
versa) without a second layout pass:

| Surface                           | Ratio source                                                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Inline figure / slide / wall tile | Stamped `width/height` attrs → intrinsic `aspect-ratio`; custom `--mf-*` caps                                                              |
| Expand modal                      | `style.aspectRatio = w / h` stamped at mount — a ratio, **not** a fixed height, so the `max-width:100%` cap shrinks the box proportionally |
| Awards cover                      | Fixed `16 / 7` + `max-height:var(--cover-max-h, 80vh)`                                                                                     |
| Internal main figure              | `max-height: 70dvh` on the figure; ≥768 the placeholder goes `width:auto` so undersized files center instead of stretching                 |
| Related media column              | `aspect-ratio: 1/1` mobile → `16/10` at ≥768 (fixed flex basis)                                                                            |
| Mentions-deck card                | `CARD_H_RATIO` (0.64) of card width                                                                                                        |
| Card-stack card                   | `CARD_H_RATIO` per tier — 9/16 landscape fan, 1.0–1.45 portrait stack (info inside the card)                                               |
| Skeletons                         | The **same** ratio as the content they stand in for                                                                                        |

## The natural-dimension ceiling

A media file never renders larger than its source:

- Render stamps `--mf-natural-w`/`--mf-natural-h` on every figure; the
  SCSS clamps `max-width/height` at `min(container, natural)`.
- `calcMediaScale` returns ≤1 — contain-fit can only shrink.
- The mosaic wall divides (`/3`, `/4`, `/2`, undivided) but never
  multiplies.
- The expand modal stamps _natural_ pixels and lets oversize overflow
  into scroll — the only surface that may exceed the viewport.
- `displayWidth/displayHeight` cap videos at `FHD_WIDTH` (1920) for
  decode budgets — a render cap, not a visual upscale.

## Width-cap → aspect-honest height transfer

When a width cap binds (container, ladder rung, viewport), height is
recomputed through the ratio — never left stale:

- The expand modal stamps `width` + `aspect-ratio` so `max-width:100%`
  transfers the shrink to height automatically.
- The media-figure placeholder re-derives `max-height` from the capped
  width's ratio (`calcAspectScaled` behavior) — a narrower box gets a
  proportionally shorter height, so `object-fit:cover` never crops
  vertically.
- `fitPeek` (cardstack/deck.ts) and the pocket fit (media-mosaic) scale
  the whole box, not one axis.

## The ≤1024 half-natural rule

`CAROUSEL.HALF_NATURAL_MAX_VW = 1024`, `HALF_NATURAL_SCALE = 0.5` — on
mobile/tablet bands every carousel media box and the strip height cap
at **half natural dimensions**. The SCSS block is declared last in the
cascade so it wins by source order (see precedence doc). Reason:
bandwidth + layout honesty on small canvases — a 4K file would paint
the same pixels at half size anyway.

## Text fitting

| Mechanism             | File                     | Rule                                                                                                                                           |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `fit` attribute       | `media/draw-text/fit.ts` | Scale-down only: `font-size` + `letter-spacing` shrink together until the widest word fits the parent content-box; never grow past styled size |
| Title → picture       | `home/about/titlefit.ts` | Title width publishes `--about-picture-w`; picture = `max(titleW, token floor)` — grows with the title, never below the design minimum         |
| Description promotion | `internals` SCSS         | An image inside prose breaks out of the 987px column to full width — media never shrinks to column width                                       |
| Word spans            | `media/draw-text/dom.ts` | UAX#14-break `nowrap` spans — the widest unbreakable word is the overflow signal the `fit` scaler reacts to                                    |

Text fitting preserves proportions — `letter-spacing` scales with
`font-size` so the tracked-out look survives the shrink.

## Resolution ladders (`srcset`/`sizes`)

| Ladder        | File                           | Contract                                                                                                                                                                         |
| ------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IMAGE_SIZES` | `core/tokens/media/sizes.ts`   | The `sizes` attr mirrors the layout contract per surface (`HOME_MOSAIC`, `CARD_STACK`, `RELATED_LIST`, `PROFILE_PICTURE`) so the CDN serves the variant matching the painted box |
| Cover ladder  | `core/utils/media/manifest.ts` | `LADDER_SUFFIXES` builds ascending q50 → q75 → … rungs per cover stem; `coverLadderStep` climbs them, publishing `--loaded` as each rung lands                                   |
| Video tiers   | `core/utils/media/policy.ts`   | `[main, scaled]` poster/source pairs; `prefersScaledVideo` picks the tier once per figure (memoized `_scaledVideo`) — render must not re-read `clientWidth` per pass             |
| Poster pair   | `figure/render.tsx`            | Hero/carousel posters ship in initial markup (~15KB, only fetched for laid-out videos); the heavy `<source>` stays IO-deferred                                                   |

## CLS reservations (skeleton geometry)

Every async surface reserves its **final** box before content exists:

- Cover skeletons carry the same `aspect-ratio` + `max-height` as the
  real cover.
- `media-mosaic` reserves `--media-mosaic-height` until the first pack.
- `cookie-banner` reserves `--cookie-banner-h` on the document so its
  dismissal doesn't shift the page.
- `route-search` clamps list height to `--rs-list-avail` — short
  windows show fewer complete rows, never a half-clipped row.
- Card/awards skeletons repeat the chrome rows (55px bars, 34px dots)
  at the final offsets.

## Per-engine fit algorithms

| Engine                      | Fit rule                                                                                                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `home/mosaic/pack.ts`       | Column-count from `MOSAIC_COLS`; featured 2-col spans; `COMP_MULTS` height ladder; lowest-column placement; `centerOffset` centers sparse walls                            |
| `media/mosaic/pack.ts`      | Natural-size tiles; divisor ladder `3`→`4`→`2`/undivided (`INTERNAL_MOSAIC.DIVISOR_*`); pocket shrink-fit `fit = pocketH/mh ≤ 1`; skyline pack; unused-strip center offset |
| `custom-carousel/sizing.ts` | Projection fit: Σ(itemW)+gaps ≤ hostW decides strip vs side-by-side; ≥3840 multi-fit; honest height = tallest renderable item                                              |
| `mentions-deck/deck.ts`     | Fill-fit (whole ring inside deck) else vw clamp `[270, 312]` / mobile `[240, 0.72×deck]`; fade lane `w×0.5` or `0` (peek)                                                  |
| `cardstack/deck.ts`         | `pickTier` selects the viewport band; `fitPeek` sizes the cover inside the card window; `fitDeckToFront` keeps the deck honest                                             |
| `draw-text/fit.ts`          | Word-overflow scale-down, proportion-preserving                                                                                                                            |

## Overflow policy

| Surface                 | Overflow behavior                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| Grids / strips / covers | Crop (`object-fit:cover` + `overflow:hidden`)                                                                   |
| Mosaic wall             | Honest boxes — the packer stamps natural-size tiles so `cover` inside can never crop; small logos use `contain` |
| Expand modal            | Scroll — `scale-down` inside a natural-px box that may exceed the dialog                                        |
| Descriptions / prose    | Reflow — breakout promotion, never mid-content crop                                                             |
| Toasts / banners        | Grow — `max-height` animation, never `height`                                                                   |
| Search list             | Truncate rows — `min(cap, avail)` so only whole rows show                                                       |
| Deck edges              | Dissolve — mask-gradient lane sized to the pose fade span; a card is never visibly cut                          |
