# `core\tokens\css\parallax.ts`

Scroll-parallax CSS custom-property names — grouped

|                |                                                           |
| -------------- | --------------------------------------------------------- |
| **Source**     | `src/core\tokens\css\parallax.ts`                         |
| **UX surface** | Shared primitives every surface builds on — no direct UI. |

## Members

### `DECK_Y`

.card-stack-deck drift — written on the <card-stack> host,
consumed inside card-stack's own sheet so the deck slides
against the section's static chrome.

### `FOOT_Y`

.card-stack-foot drift — same host; the controls row rises
counter to the deck so it never clashes with the about
section sliding in beneath it.

### `ABOUT_MAIN_Y`

.about-main column drift — written on the <about-section> host,
inherited into its shadow and consumed by about/_section.scss.

### `ABOUT_TEXT_Y`

.about-profile-text column drift — same host/inheritance path.

### `CONTACT_Y`

Contact text block drift — written on the <contact-section> host,
consumed by .contact-title/.contact-subtitle/.contact-row as one
glued unit inside the painted band.

### `AWARDS_Y`

Awards band content drift — written on <awards-mentions>, consumed
by the footer's inner rows as one glued unit.
