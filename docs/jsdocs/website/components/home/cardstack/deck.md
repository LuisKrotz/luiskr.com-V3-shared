# `website\components\home\cardstack\deck.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\deck.ts`         |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### `DEG`

Degrees → radians for the projected-edge trigonometry.

### `_wasVisible`

Last pose-pass visibility per card element — a card that was hidden on
the previous pass and is visible now seeds its rise-and-fade entrance.
Keyed by element so a re-rendered card starts a fresh baseline (no
entrance on first paint).

### `deckItems`

Every pushed item fans in the deck — the full portfolio list in order
(the featured flag is decorative only; no filtering applies).

- `@param` host The CardStack element.
- `@returns` The deck's ordered item list.

### `ringSigned`

Signed ring distance of `d` modulo `len`, normalized into (-len/2, len/2]
so the shortest fan direction wins — fractional `d` (mid-drag) passes
through unchanged in magnitude.

- `@param` d Raw index difference (may be fractional, any sign).
- `@param` len Deck length.
- `@returns` Signed ring offset.

### `pickTier`

The coverflow tier for a viewport — the first (widest) tier whose
MIN_VW the width meets; the portrait tablet tier also requires a
taller-than-wide viewport, mirroring the SCSS `orientation` split.
The final (phone) tier has MIN_VW 0 and is the unconditional floor.

- `@param` vw Viewport width px.
- `@param` vh Viewport height px.
- `@returns` The matching tier.

### `fanPose`

The coverflow pose for signed offset `s` (see CardStackTier for the
full model). With a = |s|, the near term min(a,1) carries the big
front→neighbour jump (FIRST_STEP / DEPTH / the full ROT_Y turn) and
the far term max(a−1,0) the tight per-card stacking (STEP /
DEPTH_STEP, plus ROT_STEP of extra turn per level so the fan wraps
like a carousel wall instead of parallel planes, capped at ROT_MAX)
— all linear in `a`, so a fractional drag offset slides every card
continuously along the curve. Right-hand
cards (s > 0) turn by +ROT_Y, which in CSS's rotateY convention sends
their outer edge away from the viewer; the left side mirrors it.
`0 - …` keeps the front depth at +0 (never −0). Opacity steps down
per level (FAN_DIM_STEP, floored at FAN_DIM_FLOOR) so the outer cards
darken into the deck edges exactly like the reference coverflow.

- `@param` s Signed ring offset (0 = front).
- `@param` len Deck length — drives the z-index ladder.
- `@param` w Card width px.
- `@param` tier The active coverflow fan tier.
- `@param` peek Visible cards per side; |s| beyond it hides the card.
- `@returns` The pose record for the DOM write.

### `stackPose`

The stacked-layout pose for signed offset `s` — the "entire card"
pile of the phone/portrait tiers, modelled as a dealt deck:

- s = +1 is the DEAL slot — the next card shifted down-right so its
  bottom band (description + CTA) peeks below the front card's edge.
- s ≥ +2 is the draw-pile FAN — each level a further step up-left,
  tilted counter-clockwise, so only the top-left corners sliver out
  into the page margins.
- s < 0 are the returned cards — they slide under the pile's bottom
  edge (the deepest up-left slot), |s|-scaled so the swiped card
  travels there smoothly mid-drag; only the most recent stays lit.
  The s > 0 path is piecewise-linear in `a` across three segments —
  min(a,1) travels 0 → DEAL__, clamp(a−1,0,1) travels DEAL__ → FAN_*
  (first fan level, so the terms are the FAN−DEAL delta), and
  max(a−2,0) adds each deeper FAN_*_STEP — a fractional drag offset
  glides through deal/fan continuously.
- `@param` s Signed ring offset (0 = front).
- `@param` len Deck length — drives the z-index ladder.
- `@param` w Card width px.
- `@param` h Card height px.
- `@param` tier The active stacked tier.
- `@param` peek Visible pile depth; deeper upcoming cards hide.
- `@returns` The pose record for the DOM write.

### `tierPose`

Pose dispatcher — the STACKED tiers' down-right cascade or the fan
tiers' left/right coverflow. Single routing site for applyPoses and
the skeleton renderer.

- `@param` tier The active tier (narrows the pose model).
- `@param` s Signed ring offset.
- `@param` len Deck length.
- `@param` w Card width px.
- `@param` h Card height px.
- `@param` peek Visible depth window.
- `@returns` The pose record for the DOM write.

### `projectedEdge`

Screen-space x (px from the deck centre) of the outer edge of the card
at offset `a` on the right side, after the perspective divide.

The card's outer edge sits at its centre x plus the half-width turned
by rot: X = x + (w/2)·cos(rot), Z = depth − (w/2)·sin(rot) (the turn
sends the outer edge back). The deck's perspective P = PERSPECTIVE·w
with its origin at the deck centre — the cards' own anchor — projects
it to X·P / (P − Z); Z ≤ 0 so the edge only ever pulls inward.

- `@param` a Unsigned ring offset.
- `@param` w Card width px.
- `@param` tier The active coverflow fan tier.
- `@returns` The projected outer-edge x in px.

### `fitPeek`

Visible cards per side — the deepest offset (≤ tier.PEEK) whose
projected outer edge stays inside the deck half-width × EDGE_ROOM,
never below PEEK_MIN. The fan is symmetric, so one count serves both
sides: on landscape/desktop the left-most card can't reach into the
text column, and on phones EDGE_ROOM > 1 lets the neighbours bleed
off-screen as the swipe hint.

- `@param` deckW Deck width px.
- `@param` w Card width px.
- `@param` tier The active coverflow fan tier.
- `@returns` Cards visible per side.

### `measure`

Measures the deck region and publishes the card box + tier: the card
width is the tier's CARD_SHARE of the deck width, capped so its height
(width × CARD_H_RATIO) stays inside HEIGHT_SHARE of the stage height —
the deck's own box, clamped to the stage budget the VIEWPORT actually
leaves it: the section is min-height 100dvh, so when the chrome (title
header, info column, foot) needs more than the window the section
overflows and the deck's measured height lies about the room available.
The stage budget subtracts the space above and below the deck inside
the section from the viewport, so the card shrinks on short windows
instead of holding a constant height while the page scrolls.
Pre-paint/hidden contexts report zero rects → the viewport width
stands in for the deck width and the height cap is skipped.

- `@param` host The CardStack element.

### `padNum`

Zero-padded counter/index number — "01", "08" — shared by the deck
counter and the index rows.

### `applyPoses`

Writes every card's pose for the current virtual front `f` — derived
from `activeIdx - _dragX/_step`, so a live drag slides the whole
coverflow continuously and `activeIdx` alone reproduces the rest pose.
Card width/height and the deck perspective (the tier's camera
distance) write once per measure() (_sizesDirty); the --active class
rides the same pass. Runs inside the gesture rAF — reads are cached
fields, writes are transform/opacity/zIndex/visibility only.

- `@param` host The CardStack element.

### `updateChrome`

Refreshes the non-pose chrome after a nav — the "PROJECT 01 OF 08"
counter (projectLabel + ofLabel, both localized), the dot --active
flags, each card's aria-hidden/tabindex so off-front cards leave the
tab order and AT tree, and the text column's copy for the new front.

- `@param` host The CardStack element.

### `_chromeIdx`

Last chromed index per host — the nav-index deal animation's
direction cue (a mount's first pass has no previous front).

### `dealNavIndex`

Deals the nav-index stack glyph after a front change — the top card
of the icon flings in the nav direction (forward on next, backward
on prev, ring-normalized so wrap-around navs read correctly) and
slides back under the pile, echoing the deck's own card exchange.
The class re-arms through a frame-boundary remove → rAF add pair so
a mid-animation nav restarts the keyframe without a forced reflow.

- `@param` host The CardStack element.
- `@param` navIndex The nav-index button carrying the glyph.

### `fitDeckToFront`

Re-fits the stacked deck's min-height to the FRONT card's rendered
height — applyPoses lets the front card auto-grow past the ratio
height so its copy never truncates and never scrolls (the page
itself absorbs the overflow); the measured delta parks as
_frontExtra (pileH's input — the behind sheets match the front's
live height) and the deck row stretches to the taller card so it
never collides with the foot. The front card's ResizeObserver
re-runs the fit when fonts/locale change the copy after mount.
Fan tiers just clear the artifact. One layout read per nav/mount —
same class as measure(), never per-frame.

- `@param` host The CardStack element.
