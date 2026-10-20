# `website/components/carousel/custom-carousel/nav.ts`

Navigation engine for CustomCarousel — goTo/prev/next/dot

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| **Source**     | `src/website/components/carousel/custom-carousel/nav.ts` |
| **UX surface** | Boot surfaces: what the user sees first on each bundle.  |

## Members

### `driveSpring`

Drives the track to `left` through the shared scroll spring — the
elastic slide travel. Reduced-motion users get the instant write
(the driver's `instant` arm). The settle callback is the nav
completion path: it fires the pending clone→real teleport if one is
armed, then releases `isNavigating` so user scrolls can teleport
again. Reduced-motion/instant still lands on the same settle call,
so every path funnels through `settleNav`.

- `@param` c The CustomCarousel element.
- `@param` track The scrollable track element.
- `@param` left Target scrollLeft (px).

### `settleNav`

Spring-settle completion for a nav — fires the armed clone teleport
(invisible: clone and twin are pixel-identical), clears its watchdog,
then releases the scroll-handler suppression.

- `@param` c The CustomCarousel element.

### `cancelNavSpring`

Gesture takeover — cancels a live scroll spring (track keeps its
position and mandatory snap re-engages for the user's own scroll),
drops the pending teleport, and releases isNavigating so the
scroll-handler clone check re-arms immediately.

- `@param` c The CustomCarousel element.

### `calcSlideCenterOffset`

Computes the scrollLeft that centers `slide` inside `track` —
slide.offsetCenter minus the visible half-track. Returns null when either
element reports zero width (not yet laid out → caller should bail).

- `@param` {Element} track — the scrollable slides track
- `@param` {Element} slide — the slide to center
- `@returns` {number | null} target scrollLeft, or null when unmeasurable

### `isNearCenter`

Clone-teleport detector: a slide counts as "parked" when its horizontal
center is within CENTER_EPS_PX of the track's center — loose enough to
catch sub-pixel scroll stops, tight enough not to fire mid-swipe.

### `markAdjacentLoaded`

Lazy-load window: flags slides within 2 ring positions of `centerIdx`
as loadable so their media src gets assigned. Distance is measured on
the ring — `min(|i−center|, len−|i−center|)` — so hovering at index 0
pre-loads the tail and vice versa. The two explicit edge lines cover
len<3 where ring distance alone under-marks.

- `@param` c The CustomCarousel element.
- `@param` centerIdx Active slide index.

### `carouselGoTo`

Navigate to slide idx — accepts out-of-range idx (idx<0 or idx≥len) by
scrolling to the CLONE slide at that edge, then scheduling an instant
teleport to its real twin (the infinite-loop illusion). Also lazy-loads
the new neighborhood and triggers `loadHighRes` on the active
<media-figure> so the target slide upgrades immediately rather than on
the next intersection tick. The double-modulo normalizes idx into
[0,len) — a single % yields −1 for negative input.

- `@param` c The CustomCarousel element.
- `@param` idx Target index — may be −1 or len for edge wraps.

### `updateActiveClasses`

Syncs the -active modifier on slides and dots with currentIndex, then
rewrites the "N of M" counter in the current locale (ofLabel is
localized — 'of', 'de', 'di', …).

- `@param` c The CustomCarousel element.

### `scrollToElement`

Smooth-centers a slide element in the track — null-safe on both ends
(clone nodes may be absent in the ≤2-item side-by-side layout).

- `@param` c The CustomCarousel element.
- `@param` el Slide element to center; null is a no-op.

### `scheduleTeleport`

Arms the clone→real teleport: `pendingTeleport` is the normal path —
the scroll spring's settle fires it through `settleNav` the frame the
clone parks. The TELEPORT_DELAY timer is only the rAF-starvation
watchdog (hidden tab): if the spring can't run, the instant jump
still lands — invisible either way since clone and twin are
pixel-identical. A pending teleport is cancelled first so rapid nav
can't queue competing jumps.

- `@param` c The CustomCarousel element.
- `@param` targetIdx Real-slide index to land on.

### `scrollToSlide`

Smooth-centers real-slide idx — `children[idx + 1]` because a clone of
the last slide is prepended to the track (index 0 is the clone).

- `@param` c The CustomCarousel element.
- `@param` idx Real-slide index.

### `jumpToSlide`

Instant (default) or smooth position jump to slide idx — used for the
clone teleports and resize refits. When layout hasn't produced
measurable widths yet (display:none parent, pre-paint) it retries one
frame later rather than computing a bogus 0-offset jump.

- `@param` c The CustomCarousel element.
- `@param` idx Real-slide index.
- `@param` smooth Smooth scroll when true (default: instant).

### `carouselOnScroll`

Scroll handler — debounces SCROLL_DEBOUNCE_MS (150ms) then runs the
clone-teleport check. Skipped while isNavigating (a programmatic scroll
fires many scroll events; letting them trigger teleports would undo the
goTo-driven clone jump mid-animation).

- `@param` c The CustomCarousel element.

### `checkInfiniteLoop`

Clone-teleport check — runs after the scroll debounce: when a clone is
parked at the track's center, instant-jump to its real twin and re-sync
active classes. This is the _user-driven_ wrap path (touch/wheel scroll
past an edge) — the programmatic path goes through carouselGoTo.

- `@param` c The CustomCarousel element.

### `carouselOnPrevClick`

Prev-arrow click — replays the WebGL arrow's click animation
(triggerClick), permanently stops autoplay (user intent overrides the
ambient cycle — the "true" latch), then navigates one step back.

- `@param` c The CustomCarousel element.

### `carouselOnNextClick`

Next-arrow click — mirrors carouselOnPrevClick in the forward direction.

- `@param` c The CustomCarousel element.

### `carouselOnDotClick`

Dot-nav click — jumps straight to idx and permanently stops autoplay;
dot clicks are deliberate picks, not ambient browsing.

- `@param` c The CustomCarousel element.
- `@param` idx Dot index → real-slide index.

### `setupIntersectionObserver`

IntersectionObserver wiring — entry: adds the in-view class and mounts
the WebGL arrows; exit: destroys the arrows (their GL contexts are
released offscreen — canvases are re-mounted on return, keeping total
live contexts bounded). `isFullyVisible` gates autoplay at
VISIBILITY_RATIO (15%): a partly-seen strip still animates, a sliver
doesn't burn frames. Threshold array [0, .15, .5, 1] gives both the
0-crossing and the gate crossing cleanly. No IntersectionObserver →
degrade to always-visible so content still shows.

- `@param` c The CustomCarousel element.
