# `core\tokens\motion\card-stack.ts`

Card-stack coverflow geometry + timing tokens — grouped

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\card-stack.ts`                    |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `MIN_VW`

Viewport width (px) at/above which the tier applies.

### `PORTRAIT`

True for the portrait-only tablet band (taller than wide).

### `CARD_SHARE`

Front-card width as a fraction of the deck width.

### `HEIGHT_SHARE`

Ceiling for the card height as a fraction of the deck height — short
viewports shrink the card (and its width, via the ratio) to fit.

### `FIRST_STEP`

Drag px per card slot — the gesture's travel unit (and on fan tiers
also the ±1 neighbour's centre offset, in card widths).

### `PEEK`

Ceiling for visible cards per side (fan) / deep (stack).

### `PERSPECTIVE`

Deck perspective distance, in card widths — larger = flatter, the
camera further back on the Z axis.

### `CARD_H_RATIO`

Card height as a multiple of its width — landscape ~0.64 planes on
fan tiers, ~0.62–1.45 "entire card" boxes on stacked tiers (the
wide-sheet bands carry the cover beside the copy, so their ratio
reads like the fan planes).

### (module scope)

Landscape-card coverflow tier (768+ landscape and every desktop).

### `STEP`

Extra centre offset per deeper card, in card widths — the tight
stacked edges of the coverflow.

### `DEPTH`

Z recess of the ±1 neighbour, in card widths.

### `DEPTH_STEP`

Extra Z recess per deeper card, in card widths.

### `ROT_Y`

Y-axis turn (deg) of the ±1 neighbour — ~58-64° keeps the artwork
readable (classic coverflow), steeper reads as slivers.

### `ROT_STEP`

Extra Y turn (deg) per card deeper than the neighbour — the fan
wraps like a carousel wall instead of stepping parallel planes:
a=2 sits ROT_Y+ROT_STEP, a=3 a further step, saturating at
ROT_MAX.

### `ROT_MAX`

Y-turn ceiling (deg) — deep cards park just short of edge-on so a
hair of artwork (and the border glow) always reads.

### `EDGE_ROOM`

Horizontal room the outermost visible card's projected edge may use,
as a multiple of the deck half-width. 1 keeps the fan inside the
deck; >1 lets phones bleed side cards off the screen edges as a
swipe hint.

### (module scope)

Portrait "entire card" stack tier (phones + portrait tablets) — the
card carries its project copy inside (cover top, title/description/
link body). The pile works like a dealt deck seen from above:
the NEXT card (s = +1) sits in the deal slot — shifted down-RIGHT so
its bottom band (description + CTA) peeks below the front card's
edge; deeper upcoming cards (s ≥ 2) fan up-LEFT behind it — each fan
level adds a small leftward/upward shift and counter-clockwise tilt
so only their top-left corners sliver out into the page margins.
Swiped cards (s < 0) slide under the pile's bottom — the deepest
up-left slot — and dissolve there (the cycled deck's bottom).

### `IN_CARD_INFO`

Whether cards carry their own project copy (title/desc/CTA) —
true on phones + portrait tablets (the "entire card" sheet),
false on the 768–1279 landscape band where the pile is image-only
and the side text column owns the copy. Also gates the in-card
title burn — hidden titles never mount a session.

### `DEAL_X`

Deal card's right offset (s = +1), in card widths.

### `DEAL_Y`

Deal card's downward offset (s = +1), in card heights — sized so
its bottom band (description + CTA) clears the front card's edge.

### `DEAL_RZ`

Deal card's clockwise tilt (deg).

### `DEAL_D`

Deal card's Z recess, in card widths.

### `FAN_X`

First fan card's signed x offset (s = +2), in card widths —
negative = left, lands the top-left sliver just past the front
card's edge.

### `FAN_X_STEP`

Extra signed x per deeper fan level, in card widths.

### `FAN_Y`

First fan card's signed y offset (s = +2), in card heights —
negative = up.

### `FAN_Y_STEP`

Extra signed y per deeper fan level, in card heights.

### `FAN_RZ`

First fan card's tilt (deg) — negative = counter-clockwise.

### `FAN_RZ_STEP`

Extra tilt per deeper fan level (deg).

### `FAN_D`

First fan card's Z recess, in card widths (positive = deeper).

### `FAN_D_STEP`

Extra Z recess per deeper fan level, in card widths.

### `PARK_X`

Parked slot's left offset at |s| = 1, in card widths — the pile's
bottom edge the swiped card slides into (pose scales by |s|, so
the front card travels there smoothly mid-drag).

### `PARK_Y`

Parked slot's upward offset at |s| = 1, in card heights.

### `PARK_RZ`

Parked slot's counter-clockwise tilt (deg).

### `PARK_D`

Parked slot's Z recess, in card widths — the deepest plane.

### (module scope)

A responsive tier — the fan camera on landscape tiers, the stack on
stacked (portrait) layouts. `STACKED` narrows the pose model.

### `CARD_STACK_TIERS`

Coverflow tiers, widest first — deck.ts picks the first tier whose
MIN_VW the viewport meets (the portrait tablet tier additionally needs
a taller-than-wide viewport). MIN_VW values mirror the `layout-*`
breakpoints the card-stack partials use (768 / 1280 / 1440 / 1920).

### (module scope)

Ultrawide (≥2560) — the same coverflow with a bigger front card so
the deck fills the widened max area instead of stranding a 1920-
sized pile in a sea of dark stage. The fan steps tighten a notch
(FIRST_STEP .5 / STEP .11) so the arc still lands inside the deck
track — extent ≈ 1.77 card widths either way.

### (module scope)

Full HD and up (≥1920) — the reference coverflow: a landscape
front card centred and flat, an AIRY arc of rotated cards per
side — the ±1 neighbour keeps ~45% of its face readable at a
shallow ~40° tilt while deeper cards recede through DEPTH_STEP
(perspective shrinks them toward the deck edges) and steepen
gradually via ROT_STEP to the ROT_MAX ceiling.

### (module scope)

Standard desktop (≥1440) — same fan, slightly tighter step so the
deck keeps its density at the smaller width.

### (module scope)

Small desktop (≥1280, 13" laptops) — a smaller share and a longer
perspective pull the camera back so the cards never bleed off the
right edge or over the text column.

### (module scope)

Tablet portrait (768–1279, taller than wide) — the same "entire
card" stack as phones with a little more margin around the card.
The 1.0 ratio floor keeps cover + title + CTA intact while the
front card sizes to its copy — a 1.45 floor alone would exceed
the viewport at this card width.

### (module scope)

Tablet landscape (1024–1279) — the side-by-side page split arrives
one band early: the desktop-style .card-stack-info column carries
the copy on the left while the deck keeps the MOBILE pile pose on
the right — image-only 16:9 landscape sheets like the fan tiers,
sized by the deck column's width (the height budget only bites on
very short windows).

### (module scope)

Tablet landscape (768–1023) — the WIDE "entire card" stack: the
cover takes the card's left column and the copy (title + button
like mobile) the right, so the card is a landscape sheet that
fits the short landscape viewport with the controls in view. The
share fills most of the deck width; the 16:9 ratio shapes the pile
behind as landscape cards too (the side text column only exists
from 1280 up).

### (module scope)

Phones (<768) — the "entire card" stack: the front card carries
cover + title + copy + link at 100% of the measured max area (the
deck width, capped by the height budget). The pile bleeds ONLY
into the page margins — the deal card's bottom band peeks
down-right and the deeper upcoming cards stair-step their tops
up-left past the front card's edges (the offsets are sized to
clear the perspective divide, which shrinks the receding cards
~15–32%). Swiped cards dive under the pile's bottom edge. The
ratio is only the BASE height — the front card auto-grows past it
so the copy never truncates (see the height:auto write in
applyPoses).

### `CARD_STACK_LAYOUT`

Coverflow constants shared by every tier — the per-card pose numbers
are computed in JS (cardstack/deck.ts) and written as inline
transform/opacity/z-index; these plus CARD_STACK_TIERS are the sole
declaration site for the fan geometry.

### `PEEK_MIN`

Floor for visible cards per side — even a cramped deck shows one
neighbour each way so the coverflow still reads as a deck.

### `Z_STRIDE`

z-index stride between depth layers.

### `CARD_W_MIN`

Card width floor (px) on the smallest phones.

### `CARD_W_MAX`

Card width cap (px) — the ultrawide ≥2560 tier legitimately sizes
past 1.2k (56% of a ~2.2k deck track), so the cap only guards
degenerate measurements (unbounded viewports, missing rects).

### `ENTER_RISE`

Fraction of card height an entering card starts below its slot —
the deck's fade-in rises this far while fading opacity back in, so a
card leaving the peek window dissolves instead of snapping out.

### `FAN_LIFT`

Fan-tier vertical bias (px) — a modest lift so the coverflow reads
centred in the section instead of hanging on the bottom chrome.

### `INDEX_SCROLL_RATIO`

Fraction of the index rail's own span scrolled per arrow click.

### `CARD_W_FALLBACK`

Fallback card width (px) when layout is unmeasurable (pre-paint).

### `DRAG_SLOP`

Drag distance (px) before a gesture commits to the deck (versus a
vertical page scroll).

### `DRAG_THRESHOLD`

Drag fraction of one step that triggers a nav on release.

### `FLICK_VEL`

Flick velocity (px/ms) that carries a short drag to the next card.

### `FRONT_EPS`

Offset tolerance for "offset ≈ front" — class/ARIA front detection.

### `FRONT_SCALE`

The ACTIVE card's extra scale on fan tiers — the reference's hero
card is plainly wider/taller than the fanned neighbours, which
perspective depth alone can't sell. The pose eases it by ring
distance (scale = 1 + (1−|s|)·(FRONT_SCALE−1) clamped ≥1) so a card
grows as it becomes active and relaxes as it slides away — a
continuous deal-through, not a snap.

### `AUTOPLAY_MS`

Autoplay countdown per card (ms) — the border light laps the
active card's rounded edge once per period, then the deck
advances one card. Any manual nav (prev/next/dots, card click,
drag/swipe, view-all) kills it until re-armed by the play
control; the section's IntersectionObserver holds it off-screen
so a scrolled-away deck never advances unseen.

### `TIMER_INSET`

Border-light inset (px) — the lit band hugs the card's edge this
far inside the border line so the fill stays within the card
while its glow blooms across the border.

### `PAD`

Zero-pad width for the "PROJECT 01 OF 08" counter numbers.

### `EAGER_TILES`

Deck positions that get eager/high-priority cover fetches (the front
card and its immediate neighbours — the LCP surface).

### `BURN_SPEED`

Tempo multiplier for the info-title paper-burn — card-stack runs
the consume+rebuild twice as fast as the mosaic's idle-armed pace.

### `STACKED_DECK_PAD`

Extra headroom the stacked deck's min-height holds past the front
card's real height (in card-h units) — the pile's bottom deal band
bleeds into it without swallowing the foot row. Kept tight so the
controls stay inside the same viewport as the card.

### `FAN_DIM_STEP`

Opacity drop per fan level — the coverflow's outer cards dim
toward the deck edges (the reference's progressive darkening).

### `FAN_DIM_FLOOR`

Opacity floor for the deepest visible fan card — low enough that
the outermost slivers fade into the dark stage like the reference.
