# `website\views\project\layout.ts`

Layout helpers for ViewProject — per-section height from the first media ratio, text stagger delays, and the landscape-group detector that forces carousel mode.

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\views\project\layout.ts`                   |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `sectionItemHeight`

Per-section CSS height: the TALLEST media item's intrinsic ratio
applied to the viewport width — min(100vw·h/w, SKELETON_ITEM_HEIGHT) —
mirroring the runtime strip, which sizes every slide to the tallest
rendered item. Emitting the height before decode means the section
never reflows when media arrives; over-reserving (never under) keeps
the correction direction downward-only. Sections without any sized
media fall back to the fixed skeleton height. `toFixed(4)` keeps the
calc string compact while preserving sub-pixel accuracy.

- `@param` c The ViewProject instance (unused — part of the method facade).
- `@param` section One section's children; the media array is detected by shape.
- `@returns` A CSS `min()` height expression.

### `textDelay`

Per-char draw delay for a section's text run: counts REAL characters
(HTML stripped — tags don't consume stagger time), then sizes the
interval so the whole run lands inside DRAW_TARGET_MS. Non-array input
gets the fallback delay so malformed CMS data still animates.

- `@param` c The ViewProject instance (unused — facade signature).
- `@param` items Section text items (expected string[]).
- `@returns` Per-char delay in ms.

### `textOffset`

Start offset for the text run at index `idx`: cumulative real chars of
the preceding items × the per-char delay, plus the per-index step — so
sequential sections cascade rather than all starting at t=0.

- `@param` c The ViewProject instance — supplies textDelay via the facade.
- `@param` items Section text items (expected string[]).
- `@param` idx Index of this item in the section.
- `@returns` Start offset in ms (0 for non-array input).

### `isLandscapeGroup`

Whether a media group is all-landscape — those can't pair side-by-side
in the two-up layout, so they force the carousel into scroll mode.

- `@param` c The ViewProject instance (unused — facade signature).
- `@param` group A media item array (shape-checked, not trusted).
- `@returns` true when every item is landscape and the group is non-empty.

### `isMosaicGroup`

Whether a media group renders as the natural-size masonry wall instead
of a carousel — the irregular-heights detector (shared predicate in
core/utils/media/group) decides purely from intrinsic `size` ratios:
mixes like half 16:9 + half 9:16, or very-wide shots beside squares,
spread past the RATIO_SPREAD_MIN gate. On ≤CAROUSEL_MAX_W viewports the
mosaic element itself falls back to the carousel, so this is a
data-only check.

- `@param` c The ViewProject instance (unused — facade signature).
- `@param` group A media item array (shape-checked by the predicate).
- `@returns` true when the group's height variation is too irregular for a

### `sectionMosaicHeight`

Pre-pack height reservation for a section's mosaic wall — runs the same
skyline packer the component uses at the predicted wall width (viewport
minus both grid gutters, the %MAXAREA contract) so the wrapper's
--media-mosaic-height min-height equals the final box and deferred
mosaics land without a layout shift. '' for non-mosaic sections —
an empty inline value removes the custom property entirely.

- `@param` c The ViewProject instance (unused — facade signature).
- `@param` section One section's children; the media array is detected by shape.
- `@returns` 'Npx' estimate, or '' when the section keeps the carousel.

### `fitDescription`

Sizes one description block: strips both promotion modifiers, then
measures the block at the BASE body size (measuring post-promotion
would read the promoted font and flip-flop). A block holding exactly
one paragraph that renders on a single line gets --xl (TTL_XL display
ramp); a single paragraph that wraps gets --md (TXT_LG); blocks with
more than one paragraph keep the base TXT_MD. The strip → read → apply
sequence runs inside one synchronous pass, so no paint ever shows the
un-promoted intermediate state.

- `@param` block One .internal-description element.

### `fitDescriptionSizes`

Description-size fit pass — classifies every .internal-description
block by measured line count (fitDescription) and wires the ResizeObserver
that refits a block when it reveals (content-visibility keeps it at
zero size until near the viewport) or its width changes with the
viewport. document.fonts.ready re-runs the pass once: the verdict is
line-count-based, so a late-arriving Poiret One metric could otherwise
leave a wrong promotion in place.

- `@param` c The ViewProject instance.

### `fitTitleHalf`

Grows or trims one marquee half to exactly `count` title units —
clones the first unit (identical "TITLE |" markup) or drops trailing
ones, so the strip is re-fitted in place without a re-render (which
would tear down every mounted carousel).

- `@param` half One INTERNAL_TITLE_COPY span; its first child is the template unit.
- `@param` count Target number of units.

### `syncTitleMarquee`

Title-marquee fit + duration sync. Measures one "TITLE |" unit and
repeats it ceil(viewportW ÷ unitW) + SAFETY_REPEAT times per half, so
each half always spans the viewport and the -50% loop never shows a
gap — short titles on wide screens just get more repetitions. Then
derives animation-duration = halfW ÷ SPEED_PX_S (halfW = count × unitW)
so the ticker drifts at a constant px/s regardless of title length or
viewport. The CSS fallback (60s) covers the pre-measure window; a
zero-width unit (skeleton state, hidden root) leaves everything in place.

- `@param` c The ViewProject instance.
