# `core\tokens\motion\carousel.ts`

Carousel timing/geometry tokens — grouped subsets of

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\carousel.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `AUTOPLAY_DURATION`

Autoplay interval in milliseconds before advancing to next slide

### `TELEPORT_DELAY`

Clone→real teleport watchdog (ms). The scroll spring's settle
callback normally fires the invisible clone→twin jump; this timer
is the last-resort cover for a dead rAF loop (hidden tab) — sized
past CAROUSEL_SPRING.MAX_MS so a merely-slow frame cadence lets the
spring's own force-settle fire the teleport instead of cutting the
flight mid-travel (a visible snap across the strip).

### `NAVIGATION_SETTLE_DELAY`

Watchdog (ms) for the isNavigating suppression window — releases if the spring's settle callback somehow never runs

### `SCROLL_DEBOUNCE_MS`

Scroll-event debounce (ms) before the clone-teleport detector runs — scroll fires per pixel, the check only matters at rest

### `RING_REGRESS_STEP`

ringProgress drained per RAF frame when autoplay stops (0–1 scale) — ~25 frames ≈ 0.4s unwind

### `CAROUSEL_SPRING`

Px-space chase-spring for the programmatic slide scroll — the organic,
slightly elastic slide travel that replaced the browser's fixed
`behavior:'smooth'` ease (which can't overshoot and ignores velocity
on retarget). Integrated by `springStep` in `core/utils/motion` with
px-space epsilons — same integrator the slider knobs run.

ωn = √96 ≈ 9.8 rad/s, ζ = 20/(2·√96) ≈ 1.02

ζ≈1.02 is the critical-damping boundary — the slide travels fast and
parks on the target with no visible swing-back (a measurable
under-damped overshoot read as bounce on full-slide travel); the
~0.6s settle keeps single-step navs snappy while multi-slide dot
jumps land without a hard stop.

### `K`

Spring stiffness — ωn² in px-space.

### `C`

Spring damping — 2ζωn with ζ≈1.02 (critically damped, no bounce).

### `SETTLE_PX`

Settle epsilon (px) — gap under this with velocity under VEL_EPS
snaps to the target so the spring never micro-rings sub-pixel.

### `VEL_EPS`

Velocity settle epsilon (px/s) — see SETTLE_PX.

### `DT_MAX_S`

Per-frame integration step cap (s) — suspended-tab resume safety.

### `DT_INIT_S`

First-frame step (s) — the loop's initial tick assumes 60Hz.

### `MAX_MS`

Watchdog (ms) — force-settles the scroll when rAF starves (hidden
tab) so isNavigating/pending teleports can never latch.

### `MIN_TRAVEL_PX`

Travel floor (px) — sub-2px moves write instantly, no frames burnt.

### `CAROUSEL_LAYOUT`

Frozen carousel map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.

### `CIRCUMFERENCE`

SVG countdown ring circumference: 2π × r (r=19)

### `MOBILE_BREAKPOINT`

Viewport width below which mobile behaviour applies

### `SIDE_BY_SIDE_BREAKPOINT`

Minimum viewport width for the ≤2-item side-by-side (non-carousel) layout

### `SWIPE_THRESHOLD`

Minimum swipe distance (px) required to trigger a slide change

### `MAX_HEIGHT_VH`

Slide height cap as a fraction of the viewport height

### `SKELETON_ITEM_HEIGHT`

Skeleton sections reserve the same capped height so content loads without shifting

### `CENTER_EPS_PX`

px tolerance for "slide center ≈ track center" in the clone-teleport detector — loose enough for sub-pixel scroll stops, tight enough not to fire mid-swipe

### `VISIBILITY_RATIO`

IntersectionObserver ratio that counts as "visible enough" to autoplay (15%)

### `FIT_EPS_PX`

px delta below which ResizeObserver width reports are ignored — sub-pixel RO noise must not trigger a re-fit storm

### `DESKTOP_SCALE_STEPS`

Desktop downscale ladder for carousel items — ÷2 always applies
(retina density), then ÷3 → ÷4 → ÷5 compound on the running width
only while the slide is still at least viewport-wide; the first
step that would drop it under DESKTOP_SCALE_MIN_W also stops the
walk. A 3840px source lands ~640 wide at 1920px viewport, a 1920px
source ~960. Mobile (≤ CAROUSEL_MAX_W) is untouched.

### `DESKTOP_SCALE_MIN_W`

Width floor (px) the compounding ladder never crosses — the last
step whose result stays above it is the one applied to height.

### `ITEM_GAP_PX`

Approx flex gap (px) added per item in the side-by-side width projection

### `MEDIA_MIN_WIDTH`

Minimum slide media width (px) — tall media floor so a fixed strip height never yields slivers; mirrors min-width in media-figure.scss

### `ITEM_MARGIN_PX`

Outer margin (px) applied to each slide item on desktop — media keeps padding + this margin of clearance on each side; mirrors margin-inline: $space-md in carousel-host.scss

### `ITEM_MARGIN_VW`

Viewport width at which the slide side margin kicks in — mirrors layout-1024 in carousel-host.scss / internals.scss

### `ITEM_PAD_768`

Horizontal item padding (both sides, px) — mirrors the ≥768 rung of the .internal-extra-item padding-inline ladder, the only rung the ≥960 side-by-side projection can reach

### `MAX_HEIGHT_FALLBACK`

Max slide height (px) used when window.innerHeight is unavailable (SSR/tests)

### `RATIO_16_9`

Numeric 16:9 aspect ratio

### `RATIO_21_9`

Numeric 21:9 aspect ratio

### `RATIO_32_9`

Numeric 32:9 aspect ratio

### `HALF_NATURAL_MAX_VW`

Viewport ceiling (px) for the half-natural render cap — the
640/768/960/1024 mobile+tablet bands never upscale a slide past
half its source pixels; mirrors the `(max-width: 1024px)` cap block
in media-figure/_placeholder.scss.

### `HALF_NATURAL_SCALE`

Scale applied to source dims when projecting the half-capped strip height

### `ASPECT_RATIO_16_9`

String token key for 16:9

### `ASPECT_RATIO_21_9`

String token key for 21:9

### `ASPECT_RATIO_32_9`

String token key for 32:9

### `CAROUSEL_LOADING`

Frozen carousel map — sole declaration site for these tokens; consumers read members and
never re-declare the strings (zero-hardcoding rules 4–5). Object.freeze makes the token
contract immutable at runtime.

### `EAGER_COUNT`

Carousels rendered synchronously with the page (the ones that can be in the first viewport)

### `BATCH_SIZE`

Below-the-fold carousels are rendered this many at a time in idle periods

### `DEFERRED_TIMEOUT`

Upper bound before a deferred batch runs anyway (ms)
