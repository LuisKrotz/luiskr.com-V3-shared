# `core\tokens\motion\parallax.ts`

Scroll-parallax parameters for the home view — per-layer

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\motion\parallax.ts`                      |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `DECK_Y`

.card-stack-deck inside <card-stack> — the cards RECEDE slower
than the scroll (linger on exit, slide under the incoming
section) while the section chrome stays put — the classic
hero parallax and the strongest depth cue on the page.

### `DECK_FOOT_Y`

.card-stack-foot inside <card-stack> — the controls row RISES
(leads the exit) so it pulls clear of the about section
instead of being dragged over the boundary.

### `ABOUT_MAIN_Y`

.about-main column inside <about-section> — trails the scroll so
the portrait/title stack lags the bio column.

### `ABOUT_TEXT_Y`

.about-profile-text column — counter-drift vs .about-main: the
bio sweeps ahead, so the two columns slide against each other by
the combined differential.

### `CONTACT_Y`

Contact text block (title/subtitle/links row) — LEADS into the
band while the nested mentions deck stays fixed; on exit the
copy lingers, sliding over the fan below.

### `AWARDS_Y`

Awards band content rows — LEAD the scroll (never trail): the
footer is the page's last element, so a trailing drift would
extend the document's scrollable overflow and grow a dead
scroll range past the footer. Leading keeps every offset
inside the page.

### `WRITE_EPSILON`

|Δpx| floor before a layer's CSS var is rewritten — anything
smaller paints identically, so skipping it kills sub-pixel
style-recalc churn during long flings.
