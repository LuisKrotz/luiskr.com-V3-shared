# `website\components\home\cardstack\types.ts`

|                |                                                         |
| -------------- | ------------------------------------------------------- |
| **Source**     | `src/website\components\home\cardstack\types.ts`        |
| **UX surface** | Boot surfaces: what the user sees first on each bundle. |

## Members

### (module scope)

Route the card links to.

### (module scope)

Cover image stem.

### (module scope)

Accessible label.

### (module scope)

Card heading.

### (module scope)

Body copy (may carry `<br>` markup from the CMS).

### (module scope)

Optional index subtitle (category/tagline when the CMS provides one).

### (module scope)

Deck membership — featured items fan in the stack.

### (module scope)

The computed coverflow pose for one card — written into inline styles
by applyPoses(); `visible` also drives the --hidden class and the
reveal/dissolve transitions.

### `x`

Horizontal centre offset from the deck centre (px).

### `y`

Vertical centre offset from the deck centre (px) — 0 on fan tiers;
the stacked tiers' down-right cascade carries it.

### `depth`

Z recess (px, ≤ 0) — the perspective divide shrinks the card.

### `rot`

Y-axis turn (deg) — side cards face the front card on fan tiers.

### `rotZ`

Z-axis tilt (deg) — 0 on fan tiers; the stacked cascade leans
deeper cards like a dealt deck.

### `opacity`

Opacity written for visible cards.

### `scale`

Extra scale — the fan's active-card boost (CARD_STACK_LAYOUT.
FRONT_SCALE) easing to 1 as the card slides away; 1 on stacked
tiers.

### `z`

z-index ladder — the front card paints on top.

### `visible`

Inside the per-side peek window.

### (module scope)

One project's copy for the text column — split from the CMS item.

### `title`

Project name — the paper-burn's raster source.

### `body`

Full CMS description (`<br>` markup kept for <draw-text>).

### `href`

Localized project route ('' without a slug).

### (module scope)

The pages/HOME translation keys <card-stack> consumes.

### (module scope)

Top-left section title ("FEATURED PROJECTS") — distinct from the
mid-left two-line counter so the phrase isn't repeated.

### (module scope)

The touch-only hint shown instead of deckHint when the input
method is touch — "Swipe." (no drag affordance exists there).

### (module scope)

Autoplay transport aria-labels — state-describing actions read
on the play/pause button ("Play autoplay"/"Pause autoplay").
