# `website\components\carousel\custom-carousel\sizing.ts`

Fit/height measurement for CustomCarousel — the

|                |                                                             |
| -------------- | ----------------------------------------------------------- |
| **Source**     | `src/website\components\carousel\custom-carousel\sizing.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.     |

## Members

### `startFitObserver`

Wires a ResizeObserver on the host that re-runs _measureFit on width
changes. Reports under FIT_EPS_PX of the last width are dropped —
scrollbars appearing/disappearing and sub-pixel reflow would otherwise
re-fit on every layout pass. The measurement defers one RAF so it runs
post-layout, and ResizeObserver absence (old engines) degrades to the
one-shot window-resize path.

- `@param` c The CustomCarousel element.

### `measureFit`

Decides whether the items fit side-by-side (no carousel chrome) or need
the scroll track. Side-by-side requires: ≤2 items, viewport
≥ SIDE_BY_SIDE_BREAKPOINT, and projected total width ≤ host width.
The projection mirrors the shadow-DOM contract in media-figure.scss +
carousel-host.scss exactly: strip height is --mf-h (70dvh minus a pad
under 1024, fixed $space-* steps above) clamped to the file's natural
height, media width is aspect-driven and capped by the regular gutter
cap, the landscape --mf-max-w ladder, AND the natural pixel width
(calcMediaBox — WASM-backed, never upscales), floored at
min(MEDIA_MIN_WIDTH, naturalW) on ≥375px viewports; each item adds its
breakpoint padding + desktop side margin. Items missing intrinsic
sizes use GENERIC_DIMENSIONS defaults (conservative portrait) so a
partial CMS row can't silently flip to scroll mode.

- `@param` c The CustomCarousel element.
- `@param` observedWidth Fresh RO width when known — avoids a layout read.

### `onCarouselResize`

Window-resize handler — `isMobile` is a live getter so the resize path
only re-publishes the slide height.

- `@param` c The CustomCarousel element.

### `isLandscapeItem`

Detects whether a slide item is landscape (by class or aspect ratio).

- `@param` item Slide descriptor.
- `@returns` true if the item represents landscape orientation.

### `isPortraitItem`

Detects whether a slide item is portrait.

- `@param` item Slide descriptor.
- `@returns` true if the item represents portrait orientation.

### `isMixedCarousel`

Evaluates whether the carousel contains a mix of both landscape and portrait items.

- `@param` items List of slide descriptors.
- `@returns` true if both landscape and portrait items are present.

### `determineLandscapeRatio`

Calculates the majority landscape aspect ratio key ('16:9' | '21:9' | '32:9') among the
landscape items in the list. Compares each item's width/height ratio against the 16:9,
21:9, and 32:9 target ratios and selects the mode (majority proportion).

- `@param` items List of slide descriptors.
- `@returns` The majority aspect ratio key ('16:9', '21:9', '32:9'), or null if no landscape items.

### `getRatioMultiplier`

Returns the numeric multiplier (w/h) for a given aspect ratio key.

- `@param` ratio Aspect ratio key ('16:9' | '21:9' | '32:9').
- `@returns` Numeric ratio (e.g. 16/9, 21/9, 32/9).

### `getSmallestPortraitRatio`

Calculates the smallest portrait aspect ratio (height / width) among portrait items.
Used in mixed carousels to anchor the uniform carousel height on mobile to the
shortest portrait item.

- `@param` items List of slide descriptors.
- `@returns` Smallest portrait height-to-width ratio, or null if no portrait items with sizes.

### `setHeightVar`

Publishes --carousel-item-height on the enclosing <section> and
--carousel-media-height on the host: the aspect-corrected height
ensuring all slides share one uniform height. In mixed carousels on
mobile, the uniform height anchors to the shortest portrait item.
The published height is also capped at the smallest natural item
height — the strip may be _less_ tall than the projection, but no
slide may ever render taller than its source file's real pixels.

- `@param` c The CustomCarousel element.
